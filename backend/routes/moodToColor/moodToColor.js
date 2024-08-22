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
    const { mood } = req.body;
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You will be provided with a description of a mood, and your task is to generate the CSS code for a color that matches it. Write your output in json with a single key called \"css_code\"."
        },
        {
          role: "user",
          content: mood
        }
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });

    const colorCode = JSON.parse(response.choices[0].message.content).css_code;

    await prisma.moodColor.create({
      data: {
        mood,
        colorCode,
      },
    });

    res.json({ colorCode });
  } catch (error) {
    console.error('Error generating color from mood:', error);
    res.status(500).json({ error: 'Error generating color from mood' });
  }
});

module.exports = router;