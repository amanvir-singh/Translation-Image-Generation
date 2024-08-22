const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { openai, genAI, deepL } = require('../../config/ai');

const targetLanguageCode = (targetLanguage) => {
  const languageCodes = {
    english: 'EN',
    french: 'FR',
    spanish: 'ES',
    armenian: 'HY',
    arabic: 'AR',
    romanian: 'RO',
    russian: 'RU',
    hindi: 'HI',
    punjabi: 'PA'
  };
  return languageCodes[targetLanguage.toLowerCase()] || 'EN';
};

router.post('/', async (req, res) => {
  try {
    const { prompt, targetLanguage, model } = req.body;
    let translatedText;

    if (model.startsWith('gpt')) {
      const translation = await openai.chat.completions.create({
        model: model || 'gpt-3.5-turbo',
        messages: [
          {
            "role": "system",
            "content": `You will be provided with a sentence in English, and your task is to translate it into ${targetLanguage}.`
          },
          {
            "role": "user",
            "content": `${prompt}`
          }
        ],
        max_tokens: 60,
      });
      translatedText = translation.choices[0].message.content;
    } else if (model.startsWith('gemini')) {
      const model1 = genAI.getGenerativeModel({ model: model });
      const opt_prompt = `Translate this text : ${prompt} to ${targetLanguage} and if you have multiple answers, stick with one`;
      const result = await model1.generateContent(opt_prompt);
      const response = await result.response;
      translatedText = response.text();
    } else if (model === 'deepl') {
      const result = await deepL.translateText(prompt, null, targetLanguageCode(targetLanguage));
      translatedText = result.text;
    }

    await prisma.translation.create({
      data: {
        prompt,
        translatedText,
        model,
        targetLanguage,
      },
    });
    res.json({ translatedText: translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error translating text');
  }
});

module.exports = router;