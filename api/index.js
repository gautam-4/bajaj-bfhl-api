const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// Environment variables for configuration
const config = {
    fullName: (process.env.FULL_NAME || 'john_doe').toLowerCase(),
    dobDDMMYYYY: process.env.DOB_DDMMYYYY || '17091999',
    email: process.env.EMAIL || 'john@xyz.com',
    rollNumber: process.env.ROLL_NUMBER || 'ABCD123',
};

const buildUserId = () => `${config.fullName}_${config.dobDDMMYYYY}`;

// Processing utility functions
const isNumericString = (s) => /^[+-]?\d+$/.test(s);
const isAlphabeticString = (s) => /^[A-Za-z]+$/.test(s);
const extractAlphaChars = (s) => (s.match(/[A-Za-z]/g) || []);

const processInputData = (dataArray) => {
    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;
    const allAlphaChars = [];

    for (const raw of dataArray) {
        const s = String(raw);

        // Extract alphabetical characters for concat_string
        const alphaChars = extractAlphaChars(s);
        allAlphaChars.push(...alphaChars);

        if (isNumericString(s)) {
            const n = parseInt(s, 10);
            if (Math.abs(n) % 2 === 0) {
                even_numbers.push(s);
            } else {
                odd_numbers.push(s);
            }
            sum += n;
        } else if (isAlphabeticString(s)) {
            alphabets.push(s.toUpperCase());
        } else {
            special_characters.push(s);
        }
    }

    // Create concat_string: reverse order, then alternating caps
    const reversedChars = allAlphaChars.reverse();
    const concat_string = reversedChars
        .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join('');

    return {
        even_numbers,
        odd_numbers,
        alphabets,
        special_characters,
        sum: String(sum),
        concat_string,
    };
};

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'BFHL API is up' });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: 'data must be an array',
            });
        }

        // Check for object/array elements
        const bad = data.find((x) => x !== null && typeof x === 'object');
        if (bad !== undefined) {
            return res.status(400).json({
                is_success: false,
                error: 'Array elements must be primitives, not objects/arrays',
            });
        }

        const result = processInputData(data);

        return res.status(200).json({
            is_success: true,
            user_id: buildUserId(),
            email: config.email,
            roll_number: config.rollNumber,
            odd_numbers: result.odd_numbers,
            even_numbers: result.even_numbers,
            alphabets: result.alphabets,
            special_characters: result.special_characters,
            sum: result.sum,
            concat_string: result.concat_string,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            is_success: false,
            error: 'Internal Server Error',
        });
    }
});

module.exports = app;