const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { openai } = require('../../config/ai');

router.post('/', async (req, res) => {
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
    await prisma.image.create({
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

module.exports = router;