export default function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData; 
    
    /*
        https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
        arr.reduce(callback[accumulator, currentValue, currentIndex, array], initialValue)
     */ 
    function totalAmount(data) {
        return data.performances
            .reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances
            .reduce((total, p) => total + p.volumeCredits, 0);
    }    

    function enrichPerformance(aPerformance) {
        const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }
    
    function volumeCreditsFor(aPerformance){
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);

        if ('comedy' === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);

        return result;
    }       
    function amountFor(aPerformance){
        let result = 0;
        switch (aPerformance.play.type) {
            case 'tragedy':
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case 'comedy':
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${perf.play.type}`);
        }
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }  
}
class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }       
}