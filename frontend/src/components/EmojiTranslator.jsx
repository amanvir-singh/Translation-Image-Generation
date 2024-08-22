import { useState } from 'react';
import axios from 'axios';
import '../css/EmojiTranslator.scss';

function EmojiTranslator() {
  const [text, setText] = useState('');
  const [translatedEmojis, setTranslatedEmojis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/EmojiTranslation/emojiTranslator`, {
        prompt: text,
      });
      setTranslatedEmojis(response.data.emojiTranslation);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="emoji-translator">
      <h2>Emoji Translator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Text to Translate:
          <textarea 
            value={text} 
            onChange={handleTextChange} 
            placeholder="Enter text to translate into emojis..."
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Translating...' : 'Translate to Emojis'}
        </button>
      </form>
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Translating...</p>
        </div>
      )}
      {!isLoading && translatedEmojis && (
        <div className="translated-emojis-container">
          <h3>Translated Emojis:</h3>
                  <p>{translatedEmojis}</p>
        </div>
      )}
    </div>
  );
}

export default EmojiTranslator;