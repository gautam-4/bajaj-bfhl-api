const isNumericString = (s) => /^[+-]?\d+$/.test(s); // integers only
const isAlphabeticString = (s) => /^[A-Za-z]+$/.test(s);

// A "special character" token per spec: not purely numeric and not purely alphabetic
const isSpecialToken = (s) => !(isNumericString(s) || isAlphabeticString(s));

// Extract alphabetical characters from any token (even mixed), for concat_string rule.
const extractAlphaChars = (s) => (s.match(/[A-Za-z]/g) || []);

module.exports = {
    isNumericString,
    isAlphabeticString,
    isSpecialToken,
    extractAlphaChars,
};
