require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

app.post('/translate', async (req, res) => {
    try {
    const { text, targetLanguage, model } = req.body;
    const translation = await openai.chat.completions.create({
      model: model || 'gpt-3.5-turbo', 
      messages: [
        {
          "role": "system",
          "content": `You will be provided with a sentence in English, and your task is to translate it into ${targetLanguage}.`
        },
        {
          "role": "user",
          "content": `${text}`
        }
      ],
      max_tokens: 60,
    });
    res.json({ translatedText: translation.choices[0].message.content});
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

    res.json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Error generating image' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
