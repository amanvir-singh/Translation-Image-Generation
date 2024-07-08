import { useEffect } from 'react';
import './App.css';
import ImageGenerationForm from './ImageGenerationForm';
import TranslationForm from './TranslationForm';

function App() {
  useEffect(() => {
    document.body.style.background = 'black';
  }, []);

  return (
    <div className="App">
      <div className="card translation-card">
        <h2>Translation App</h2>
        <TranslationForm />
      </div>
      <div className="card image-generation-card">
        <h2>Image Generation</h2>
        <ImageGenerationForm />
      </div>
    </div>
  );
}

export default App;
