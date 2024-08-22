import { useState } from 'react';
import axios from 'axios';
import '../css/ImageGenerationForm.scss';

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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/imageGeneration/generate-image`, {
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
      <h2>Image Generator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Image Prompt:
          <textarea 
            value={prompt} 
            onChange={handlePromptChange} 
            placeholder="Describe the image you want to generate..."
          />
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
          <a href={generatedImage} download className="download-button">Download Image</a>
        </div>
      )}
    </div>
  );
}

export default ImageGenerationForm;