const {
    isNumericString,
    isAlphabeticString,
    isSpecialToken,
    extractAlphaChars,
} = require('./classify.util');

// Alternating caps starting with UPPER on index 0.
const alternatingCaps = (chars) =>
    chars.map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())).join('');

const processInputData = (dataArray) => {
    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;
    const seenAlphaCharsInOrder = [];

    for (const raw of dataArray) {
        const s = String(raw); // coerce everything to string

        // collect alphabetical characters from ANY token for concat_string rule
        for (const ch of extractAlphaChars(s)) {
            seenAlphaCharsInOrder.push(ch);
        }

        if (isNumericString(s)) {
            // even/odd buckets (keep as strings)
            const n = parseInt(s, 10);
            if (Math.abs(n) % 2 === 0) {
                even_numbers.push(s);
            } else {
                odd_numbers.push(s);
            }
            sum += n;
        } else if (isAlphabeticString(s)) {
            // uppercase alphabets
            alphabets.push(s.toUpperCase());
        } else {
            special_characters.push(s);
        }
    }

    // reverse the gathered alpha characters, then apply alternating caps
    const reversedChars = seenAlphaCharsInOrder.reverse();
    const concat_string = alternatingCaps(reversedChars);

    return {
        even_numbers,
        odd_numbers,
        alphabets,
        special_characters,
        sum: String(sum),
        concat_string,
    };
};

module.exports = { processInputData };  