import React, { useState } from 'react';
import './App.css';
import { parseSessionData } from './parser';
import { SplitProfit } from './SplitProfit'

function App() {
  const [text, setText] = useState('');
  const result = parseSessionData(text);
  return (
    <div className="App">
      <div>
        <h3>Analyser</h3>
        <textarea onChange={e => setText(e.target.value)}></textarea>
      </div>
      <SplitProfit participants={result}></SplitProfit>
    </div>
  );
}

export default App;
