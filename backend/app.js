const express = require('express');
const cors = require('cors');

const translateRouter = require('./routes/translate/translate');
const suggestRouter = require('./routes/translate/suggest');
const generateImageRouter = require('./routes/imageGeneration/generateImage');
const emojiTranslator = require('./routes/emojiTranslator/emojiTranslator');
const sarcasticChatBox = require('./routes/sarcasticChatAI/sarcasticChatBox');
const interviewQuestions = require('./routes/interviewQuestions/interviewQuestions');
const moodToColor = require('./routes/moodToColor/moodToColor');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/translate', translateRouter);
app.use('/translate/suggest', suggestRouter);
app.use('/imageGeneration/generate-image', generateImageRouter);
app.use('/EmojiTranslation/emojiTranslator', emojiTranslator);
app.use('/sarcasticChatAI/sarcasticChatBox', sarcasticChatBox);
app.use('/interviewQuestions/interviewQuestions', interviewQuestions);
app.use('/moodToColor/moodToColorChanger', moodToColor);

module.exports = app;