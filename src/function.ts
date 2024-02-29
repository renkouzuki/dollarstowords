export const currencyToWords = (amount: number): string => {
    if (amount === 0) {
        return 'Zero Dollars';
    }

    const onesWords: string[] = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teensWords: string[] = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tensWords: string[] = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const scales: string[] = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

    const toWords = (n: number): string => {
        if (n === 0) {
            return '';
        }

        let words: string = '';

        for (let i = 0; n > 0; i++) {
            if (n % 1000 !== 0) {
                words = helper(n % 1000) + scales[i] + ' ' + words;
            }
            n = Math.floor(n / 1000);
        }

        return words.trim();
    };

    const helper = (n: number): string => {
        if (n === 0) {
            return '';
        } else if (n < 10) {
            return onesWords[n] + ' ';
        } else if (n < 20) {
            return teensWords[n - 10] + ' ';
        } else if (n < 100) {
            return tensWords[Math.floor(n / 10)] + ' ' + helper(n % 10);
        } else {
            return onesWords[Math.floor(n / 100)] + ' Hundred ' + helper(n % 100);
        }
    };

    const dollars = Math.floor(amount);
    const cents = Math.round((amount - dollars) * 100);

    let words: string = '';

    if (dollars > 0) {
        words += toWords(dollars) + ' Dollar';
        if (dollars !== 1) words += 's';
    }

    if (cents > 0) {
        if (dollars > 0) words += ' and ';
        words += toWords(cents) + ' Cent';
        if (cents !== 1) words += 's';
    }

    return words;
}