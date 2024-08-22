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
          content: "You will be provided with text, and your task is to translate it into emojis. Do not use any regular text. Do your best with emojis only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 64,
      top_p: 1,
    });

    const emojiTranslation = response.choices[0].message.content;



    await prisma.emojiTranslation.create({
      data: {
        prompt,
        emojiTranslation,
      },
    });
    res.json({ emojiTranslation  });
  } catch (error) {
    console.error('Error translating text to emojis:', error);
    res.status(500).json({ error: 'Error translating text to emojis' });
  }
});

module.exports = router;