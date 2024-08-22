import { useState } from 'react';
import axios from 'axios';
import '../css/InterviewQuestionsGenerator.scss';

function InterviewQuestionsGenerator() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [topic, setTopic] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberChange = (event) => {
    const value = Math.min(Math.max(1, parseInt(event.target.value) || 1), 15);
    setNumberOfQuestions(value);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/interviewQuestions/interviewQuestions`, {
        numberOfQuestions,
        topic,
      });
      setGeneratedQuestions(response.data.interviewQuestions);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="interview-questions-generator">
      <h2>Interview Questions Generator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Questions (1-15):
          <input 
            type="number" 
            value={numberOfQuestions} 
            onChange={handleNumberChange}
            min="1"
            max="15"
          />
        </label>
        <label>
          Topic:
          <input 
            type="text" 
            value={topic} 
            onChange={handleTopicChange}
            placeholder="Enter interview topic..."
          />
        </label>
        <button type="submit" disabled={isLoading || !topic}>
          {isLoading ? 'Generating...' : 'Generate Questions'}
        </button>
      </form>
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Generating questions...</p>
        </div>
      )}
      {!isLoading && generatedQuestions && (
        <div className="generated-questions-container">
          <h3>Generated Questions:</h3>
          <div dangerouslySetInnerHTML={{ __html: generatedQuestions.replace(/\n/g, '<br>') }} />
        </div>
      )}
    </div>
  );
}

export default InterviewQuestionsGenerator;