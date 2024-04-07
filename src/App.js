

import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [mail, setMail] = useState('');
  const [result, setResult] = useState('');

  // Regex
  const [denyRegex, setDenyRegex] = useState([
    /please help|assist me/i,
    /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i,
    /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i,
    /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i,
    /dear friend/i,
  ]);

  const [denyWords, setDenyWords] = useState([
    'please help',
    'assist me',
    'XXX dollars',
    'free money',
    'stock alert',
    'dear friend'
  ]);

  const handleAddWord = (e) => {
    const trimmedText = text.trim();
    if (!trimmedText || denyWords.includes(trimmedText)) {
      alert("Please enter a unique, non-empty spam keyword.");
      setText(''); // Clear input 
      return;
    }
    setDenyWords([...denyWords, trimmedText]);
    setDenyRegex([...denyRegex, new RegExp(trimmedText, 'i')]);
    setText(''); // Clear input after adding
  }


  const isSpam = (msg) => denyRegex.some((regex) => regex.test(msg));

  const checkMail = () => {
    if (!mail) {
      alert("Please enter a mail.");
      return;
    }

    const spamResult = isSpam(mail) ? "Be careful! It looks like a spam mail." : "It seems not a spam mail.";
    setResult(spamResult);
    setMail(''); // Clear the mail after checking
  };


  return (
    <div className="App">
      <header>
        <h1>Mail Spam Filter</h1>
      </header>
      <main>
        <section>
          <p>Current filtered texts includes: </p>
          <ul>
            {denyWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
          <label htmlFor="add-filtered-word">Add more filtered text:</label>
          <input
            type="text"
            id="add-filtered-word"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter filtered text here"
          />
          <button onClick={handleAddWord}>Add Filtered Text</button>
        </section>

        <section>
          <div>
            <label htmlFor="mail-input">Mail:</label>
            <textarea
              id="mail-input"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              rows="4"
              cols="50"
              placeholder="Enter mail here"
            />
          </div>
          <button onClick={checkMail}>Check Mail</button>
          <p>{result}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
