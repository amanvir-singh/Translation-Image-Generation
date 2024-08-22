const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { numberOfQuestions, topic } = req.body;

    if (!numberOfQuestions || !topic) {
      return res.status(400).json({ error: 'Number of questions and topic are required' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Create a list of ${numberOfQuestions} questions for an interview about ${topic}.`
        }
      ],
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
    });

    const interviewQuestions = response.choices[0].message.content;

    await prisma.interviewQuestions.create({
      data: {
        topic,
        numberOfQuestions,
        questions: interviewQuestions,
      },
    });

    res.json({ interviewQuestions });
  } catch (error) {
    console.error('Error generating interview questions:', error);
    res.status(500).json({ error: 'Error generating interview questions' });
  }
});

module.exports = router;