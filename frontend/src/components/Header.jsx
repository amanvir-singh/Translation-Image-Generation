import { Link } from 'react-router-dom';
import '../css/Header.scss'; 

const Header = () => {
    return (
      <header className="header">
        <h1 className="header-title">AI Tools</h1>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link> 
          <Link to="/translate" className="nav-link">Text Translator</Link>
          <Link to="/generate-image" className="nav-link">Image Generator</Link>
          <Link to="/emoji-translator" className="nav-link">Emoji Translator</Link>
          <Link to="/sarcastic-chat" className="nav-link">Sarcastic ChatAI</Link>
          <Link to="/interview-questions-generator" className="nav-link">Interview Questions Generator</Link>
          <Link to="/mood-to-color-changer" className="nav-link">Mood to Color Changer</Link>
        </nav>
      </header>
    );
  };

export default Header;