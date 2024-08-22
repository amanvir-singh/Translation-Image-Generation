import { useState } from 'react';
import axios from 'axios';
import '../css/SarcasticChatAI.scss';

const SarcasticChatAI = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sarcasticChatAI/sarcasticChatBox`, {
        prompt: userInput, 
      });

      const assistantMessage = response.data.response;
      
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error fetching response from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sarcastic-chat-ai">
      <h2>Sarcastic ChatAI</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role}>
            <strong>{msg.role === 'user' ? 'You' : 'Marv'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default SarcasticChatAI;