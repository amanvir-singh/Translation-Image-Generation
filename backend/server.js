require('dotenv').config();
const express = require('express');
const cors = require('cors');
const deepl = require('deepl-node');
const { OpenAI } = require("openai");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const deepL = new deepl.Translator(process.env.DeepL_API);



app.post('/translate', async (req, res) => {
    try {
    const { prompt, targetLanguage, model } = req.body;
      let translatedText;
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

    const updateDatabase = await prisma.translation.create({
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

app.post('/suggest', async (req, res) => {
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

app.post('/generate-image', async (req, res) => {
  try {
    const { prompt, model } = req.body;
    
    let imageParams = {
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    };
    
    if (model === 'dall-e-3') {
      imageParams.model = "dall-e-3";
      imageParams.quality = "standard";
    } else {
      imageParams.model = "dall-e-2";
    }

    const response = await openai.images.generate(imageParams);
    const imageUrl = response.data[0].url;
    const updateDatabase = await prisma.image.create({
      data: {
        prompt,
        imageUrl,
        model,
      },
    });

    res.json({ imageUrl: imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Error generating image' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));