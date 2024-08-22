import { useState } from 'react';
import axios from 'axios';
import '../css/TranslationForm.scss';

function TranslationForm() {
  const [inputText, setInputText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    if (newText.length > 2) {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/translate/suggest?text=${newText}!`)
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
    const deeplUnsupportedLanguages = ['hindi', 'punjabi', 'armenian'];
    if (selectedModel === 'deepl' && deeplUnsupportedLanguages.includes(selectedLanguage)) {
      setTranslatedText(`DeepL does not support translation for ${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}!`);
      return; 
    }
    setIsLoading(true); 
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/translate`, {
        prompt: inputText,
        targetLanguage: selectedLanguage,
        model: selectedModel
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error:', error);
    }finally {
      setIsLoading(false); 
    }
  };

  const languages = ['english', 'french', 'spanish', 'armenian', 'arabic', 'romanian', 'russian', 'hindi', 'punjabi'];
  const models = [
    { name: 'GPT-3.5', value: 'gpt-3.5-turbo' },
    { name: 'GPT-4', value: 'gpt-4' },
    { name: 'GPT-4 Turbo', value: 'gpt-4-turbo' },
    { name: 'Gemini 1.0', value: 'gemini-1.0-pro' },
    { name: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash' },
    { name: 'Gemini 1.5 Pro', value: 'gemini-1.5-pro' },
    { name: 'DeepL', value: 'deepl' }
  ];

  return (
    <div className="translation-form">
      <h2>Text Translator</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-section">
          <label htmlFor="input-text">Enter Text:</label>
          <textarea 
            id="input-text"
            value={inputText} 
            onChange={handleInputChange}
            placeholder="Type or paste your text here..."
          />
          {suggestion && (
            <div className="suggestion-container">
              <p>Did you mean:</p>
              <span className="suggestion-text" onClick={handleSuggestionClick}>{suggestion}</span>
            </div>
          )}
        </div>

        <div className="options-section">
          <div className="language-section">
            <h3>Translate to:</h3>
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
          </div>

          <div className="model-section">
            <h3>Translation Model:</h3>
            <div className="model-group">
              {models.map(model => (
                <button
                  key={model.value}
                  type="button"
                  className={`model-button ${selectedModel === model.value ? 'active' : ''}`}
                  onClick={handleModelSelect(model.value)}
                >
                  {model.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="translate-button" disabled={isLoading}>
          {isLoading ? 'Translating...' : 'Translate'}
        </button>
      </form>

      {translatedText && (
        <div className="translated-text-container">
          <h3>Translation:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default TranslationForm;