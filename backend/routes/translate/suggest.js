const express = require('express');
const router = express.Router();
const { openai } = require('../../config/ai');

router.post('/', async (req, res) => {
  const { text, model } = req.query;
  try {
    const response = await openai.chat.completions.create({
      model: model || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You will be provided with a sentence in English, and your task is to make it grammatically correct. If it is already correct, don't respond with anything.`
        },
        {
          role: "user",
          content: `${text}`
        }
      ],
      max_tokens: 50,
      n: 1,
      stream: false
    });
    const completion = response.choices[0].message.content;
    res.json({ suggestion: completion });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating suggestions');
  }
});

module.exports = router;