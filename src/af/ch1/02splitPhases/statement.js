// ./node_modules/.bin/babel src --out-dir dist
// node ./dist/af/ch1/02splitPhases/statement.js

import createStatementData from './createStatementData.js'

let plays = {
    hamlet: { name: 'Hamlet', type: 'tragedy' },
    'as­like': { name: 'As You Like It', type: 'comedy' },
    othello: { name: 'Othello', type: 'tragedy' }
};

let invoices = [{
    customer: 'BigCo',
    performances: [{
            playID: 'hamlet',
            audience: 55
        },
        {
            playID: 'as­like',
            audience: 35
        },
        {
            playID: 'othello',
            audience: 40
        }
    ]
}];

let rlt = statement(invoices[0], plays);
console.log(rlt);

function statement(invoice, plays){
    return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data['performances']) {       
        // print line for this order
        result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience} seats)\n`;
    }


    result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;

    function usd(aNumber){
        //const format = new Intl.NumberFormat("en-­US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(aNumber);
    }                   

 
}

