import React, { useState } from 'react';
import { Participant, splitProfit } from './parser';
import { DisplayResults } from './DisplayResults';

type SplitProfitProps = {
    participants: Participant[]
}

const addExpenses = (participants: Participant[], additionalExpenses: Map<string, number>): Participant[] => {
    return participants.map(p => {
        const balance = p.balance - (additionalExpenses.get(p.name) || 0);
        return { ...p, balance };
    });
}


function SplitProfit({ participants }: SplitProfitProps) {
    const [additionalExpenses, setAdditionalExpenses] = useState<Map<string, number>>(new Map());

    const result = splitProfit(addExpenses(participants, additionalExpenses));

    return <div>
        {participants.length > 0 && <h3>Additional expenses</h3>}
        {participants.map(p => <div>
            <span>{p.name}</span>
            <input type="number" onChange={e => {
                const newExpenses = new Map(additionalExpenses);
                newExpenses.set(p.name, parseInt(e.target.value));
                setAdditionalExpenses(newExpenses);
            }}></input>
        </div>)}
        <DisplayResults result={result}></DisplayResults>

    </div>

}

export { SplitProfit };