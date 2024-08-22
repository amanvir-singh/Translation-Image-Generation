require('dotenv').config();
const deepl = require('deepl-node');
const { OpenAI } = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const deepL = new deepl.Translator(process.env.DeepL_API);

module.exports = { openai, genAI, deepL };