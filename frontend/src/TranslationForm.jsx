import { useState } from 'react';
import axios from 'axios';
import './TranslationForm.css';

function TranslationForm() {
  const [inputText, setInputText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    if (newText.length > 2) {
      axios.post(`https://translation-image-generation-backend.onrender.com/suggest?text=${newText}`)
        .then(response => setSuggestion(response.data.suggestion))
        .catch(error => console.error('Error:', error));
    } else {
      setSuggestion('');
    }
  };

  const handleSuggestionClick = () => {
    setInputText(suggestion);
    setSuggestion('');
  };

  const handleLanguageSelect = (language) => (event) => {
    event.preventDefault(); 
    setSelectedLanguage(language);
  };

  const handleModelSelect = (model) => () => {
    setSelectedModel(model);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://translation-image-generation-backend.onrender.com/translate', {
        text: inputText,
        targetLanguage: selectedLanguage,
        model: selectedModel
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const languages = ['english', 'french', 'spanish', 'armenian', 'arabic', 'romanian', 'russian', 'hindi', 'punjabi'];
  const models = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'];

  return (
    <div className="translation-form">
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <textarea value={inputText} onChange={handleInputChange} />
          {suggestion && (
            <div className="suggestion-container">
              <p>Did you mean:</p>
              <span className="suggestion-text" onClick={handleSuggestionClick}>{suggestion}</span>
            </div>
          )}
        </label>
        <label>
          Translate to
          <div className="radio-group">
            {languages.map(lang => (
              <button
                key={lang}
                type="button" 
                className={`language-button ${selectedLanguage === lang ? 'active' : ''}`}
                onClick={handleLanguageSelect(lang)}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </label>
        <label>
          GPT Model:
          <div className="model-group">
            {models.map(model => (
              <button
                key={model}
                type="button"
                className={`model-button ${selectedModel === model ? 'active' : ''}`}
                onClick={handleModelSelect(model)}
              >
                {model}
              </button>
            ))}
          </div>
        </label>
        <button type="submit">Translate</button>
      </form>
      {translatedText && (
        <div className="translated-text-container">
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default TranslationForm;
