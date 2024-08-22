import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TranslationForm from './components/TranslationForm.jsx';
import ImageGenerationForm from './components/ImageGenerationForm.jsx';
import EmojiTranslator from './components/EmojiTranslator.jsx';
import Header from './components/Header.jsx';
import SarcasticChatAI from './components/SarcasticChatAI.jsx';
import InterviewQuestionsGenerator from './components/InterviewQuestionsGenerator.jsx';
import MoodtoColorChanger from './components/MoodtoColorChanger.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Header/>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/translate" element={<TranslationForm />} />
        <Route path="/generate-image" element={<ImageGenerationForm />} />
        <Route path="/emoji-translator" element={<EmojiTranslator />} />
        <Route path="/sarcastic-chat" element={<SarcasticChatAI />} />
        <Route path="/interview-questions-generator" element={<InterviewQuestionsGenerator />} />
        <Route path="/mood-to-color-changer" element={<MoodtoColorChanger />} />
    </Routes>
    </Router>
    
  </React.StrictMode>,
)
