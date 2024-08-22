import { useState } from 'react';
import axios from 'axios';
import '../css/MoodtoColorChanger.scss';

function MoodtoColorChanger() {
  const [mood, setMood] = useState('');
  const [colorCode, setColorCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const filterColorCode = (code) => {
    if (typeof code !== 'string') return '';

    code = code.trim();

    const hexCodeMatch = code.match(/#[0-9A-Fa-f]{6}/);
    if (hexCodeMatch) {
      return hexCodeMatch[0];
    }

   
    return '';
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/moodToColor/moodToColorChanger`, {
        mood,
      });
      setColorCode(filterColorCode(response.data.colorCode));
      {console.log(colorCode)}
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mood-color-changer">
      <h2>Mood to Color Changer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Describe your mood:
          <input 
            type="text" 
            value={mood} 
            onChange={handleMoodChange} 
            placeholder="e.g., Calm ocean at sunrise"
          />
        </label>
        <button type="submit" disabled={isLoading || !mood}>
          {isLoading ? 'Generating...' : 'Generate Color'}
        </button>
      </form>
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Generating color...</p>
        </div>
      )}
      {!isLoading && colorCode && (
        <div className="color-result">
          <h3>Generated Color:</h3>
          <div 
            className="color-box" 
            style={{ backgroundColor: colorCode }}
          ></div>
          <p>{colorCode}</p>
        </div>
      )}
    </div>
  );
}

export default MoodtoColorChanger;