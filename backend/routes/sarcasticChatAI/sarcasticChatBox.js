// routes/sarcasticChatAI.js
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
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Marv, a chatbot that reluctantly answers questions with sarcastic responses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1,
    });

    const sarcasticResponse = response.choices[0].message.content;

    
    await prisma.sarcasticChat.create({
      data: {
        prompt,
        response: sarcasticResponse,
      },
    });
      res.json({ response: sarcasticResponse });
      
  } catch (error) {
    console.error('Error processing sarcastic chat:', error);
    res.status(500).json({ error: 'Error processing sarcastic chat' });
  }
});

module.exports = router;