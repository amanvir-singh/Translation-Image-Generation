import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './css/App.scss';

function App() {
  useEffect(() => {
    document.body.style.background = 'black';
  }, []);

  return (
    <div className="App">
      <h1 className="title">AI Tools</h1>
      <div className="tools-container">
        <Link to="/translate" className="tool-link">
          <div className="tool-card">
            <h2 className="tool-title">Translator</h2>
            <p className="tool-description">Translate text between multiple languages using advanced AI models.</p>
          </div>
        </Link>
        <Link to="/generate-image" className="tool-link">
          <div className="tool-card">
            <h2 className="tool-title">Image Generator</h2>
            <p className="tool-description">Generate images from text prompts using state-of-the-art AI models.</p>
          </div>
        </Link>
        <Link to="/emoji-translator" className="tool-link">
          <div className="tool-card">
            <h2 className="tool-title">Emoji Translation</h2>
            <p className="tool-description">Translate regular text into emoji text.</p>
          </div>
        </Link>
        <Link to="/sarcastic-chat" className="tool-link">
          <div className="tool-card">
            <h2 className="tool-title">Sarcastic ChatAI</h2>
            <p className="tool-description">Chat with a factual chatbot that is also sarcastic.</p>
          </div>
        </Link>
        <Link to="/interview-questions-generator" className="tool-link">
          <div className="tool-card">
            <h2 className="tool-title">Interview Questions Generator</h2>
            <p className="tool-description">Create interview questions.</p>
          </div>
        </Link>
        <Link to="/mood-to-color-changer" className="tool-link">
          <div className="tool-card">
            <h2 className="tool-title">Mood to Color Changer</h2>
            <p className="tool-description">Turn a text description into a CSS color.</p>
          </div>
        </Link>
        
      </div>
    </div>
  );
}

export default App;