import React from 'react';
import { Result } from './parser';

type DisplayResultsProps = {
    result: Result
}

function DisplayResults({ result }: DisplayResultsProps) {

    return <div>
        <h3>Result</h3>
        <p>Profit per person: {result.profitPerPerson}</p>
        {result.payments && result.payments.map(payment => <p>{payment.from} should give {payment.amount} to {payment.to}</p>)}
    </div>
}

export { DisplayResults };