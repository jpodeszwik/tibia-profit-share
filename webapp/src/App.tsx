import React, { useState } from 'react';
import './App.css';
import { parseSessionData } from './parser';

function App() {
  const [text, setText] = useState('');
  const result = parseSessionData(text);
  return (
    <div className="App">
      <div>
        <textarea onChange={e => setText(e.target.value)}></textarea>
      </div>
      <div>
        <p>Profit per person: {result.profitPerPerson}</p>
        {result.payments && result.payments.map(payment => <p>{payment.from} should give {payment.amount} to {payment.to}</p>)}
      </div>
    </div>
  );
}

export default App;
