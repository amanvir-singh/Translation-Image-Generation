import { useState } from 'react';
import axios from 'axios';
import './ImageGenerationForm.css';

function ImageGenerationForm() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [selectedModel, setSelectedModel] = useState('dall-e-2');
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleModelSelect = (model) => () => {
    setSelectedModel(model);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://translation-image-generation-backend.onrender.com/generate-image', {
        prompt: prompt,
        model: selectedModel
      });
      setGeneratedImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const models = ['dall-e-2', 'dall-e-3'];

  return (
    <div className="image-generation-form">
      <form onSubmit={handleSubmit}>
        <label>
          Image Prompt:
          <textarea value={prompt} onChange={handlePromptChange} />
        </label>
        <label>
          AI Model:
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Generating image...</p>
        </div>
      )}
      {!isLoading && generatedImage && (
        <div className="generated-image-container">
          <img src={generatedImage} alt="Generated" />
        </div>
      )}
    </div>
  );
}

export default ImageGenerationForm;
