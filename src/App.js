import React, { useState, useCallback } from 'react';
import './App.css';

const QUOTES = [
  { text: "The present moment is the only moment available to us, and it is the door to all moments.", author: "Thich Nhat Hanh" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Wherever you are, be all there.", author: "Jim Elliot" },
  { text: "Almost everything will work again if you unplug it for a few minutes — including you.", author: "Anne Lamott" },
  { text: "The quieter you become, the more you are able to hear.", author: "Rumi" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse" },
  { text: "Nothing is worth more than this day.", author: "Johann Wolfgang von Goethe" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { text: "Always remember that you are absolutely unique, just like everyone else.", author: "Margaret Mead" },
  { text: "Do not go where the path may lead; go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison" },
  { text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", author: "Dr. Seuss" },
  { text: "If life were predictable it would cease to be life and be without flavor.", author: "Eleanor Roosevelt" },
  { text: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
];

function getRandomIndex(exclude) {
  let idx;
  do { idx = Math.floor(Math.random() * QUOTES.length); } while (idx === exclude && QUOTES.length > 1);
  return idx;
}

const PALETTES = [
  { bg: '#EAF4F4', card: '#ffffff', accent: '#4A9B8E', text: '#1C3D3A' },
  { bg: '#F4EAF4', card: '#ffffff', accent: '#8E4A9B', text: '#2D1C3D' },
  { bg: '#F4F4EA', card: '#ffffff', accent: '#8E9B4A', text: '#2D3D1C' },
  { bg: '#EAF0F4', card: '#ffffff', accent: '#4A6E9B', text: '#1C2D3D' },
  { bg: '#F4EAEA', card: '#ffffff', accent: '#9B4A4A', text: '#3D1C1C' },
];

export default function App() {
  const [idx, setIdx] = useState(() => getRandomIndex(-1));
  const [fading, setFading] = useState(false);
  const [paletteIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);


  const palette = PALETTES[paletteIdx];
  const quote = QUOTES[idx];

  const nextQuote = useCallback(() => {
    setFading(true);
    setLiked(false);
    setTimeout(() => {
      setIdx(prev => getRandomIndex(prev));
      setFading(false);
    }, 350);
  }, []);

  const copyQuote = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app" style={{ background: palette.bg }}>
      <div className="watermark">❝</div>

      <div className="card" style={{ background: palette.card }}>
        <div className="card-top">
          <span className="label" style={{ color: palette.accent }}>Quote of the moment</span>
          <span className="counter">{idx + 1} / {QUOTES.length}</span>
        </div>

        <div className={`quote-wrap ${fading ? 'fade-out' : 'fade-in'}`}>
          <p className="quote-text" style={{ color: palette.text }}>
            "{quote.text}"
          </p>
          <p className="quote-author" style={{ color: palette.accent }}>
            — {quote.author}
          </p>
        </div>

        <div className="actions">
          <button
            className="icon-btn"
            onClick={() => setLiked(l => !l)}
            title="Like"
            style={{ color: liked ? '#E07070' : '#aaa' }}
          >
            {liked ? '❤️' : '🤍'}
          </button>

          <button
            className="new-btn"
            onClick={nextQuote}
            style={{ background: palette.accent }}
          >
            New Quote
          </button>

          <button
            className="icon-btn"
            onClick={copyQuote}
            title="Copy"
            style={{ color: copied ? palette.accent : '#aaa', fontSize: copied ? '0.7rem' : '1.1rem', border: copied ? 'none' : '1.5px solid #eee' }}
          >
            {copied ? 'Copied!' : '📋'}
          </button>
        </div>
      </div>

      <p className="footer">Made by Areesha Yaseen</p>
    </div>
  );
}
