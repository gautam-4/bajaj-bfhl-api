const { processInputData } = require('../utils/process.util');

// build user_id from FULL_NAME and DOB; fullName already lowercase
const buildUserId = (config) => `${config.fullName}_${config.dobDDMMYYYY}`;

const postBfhl = (req, res, next) => {
    try {
        // Lazy-load env-backed config so that importing this module doesn't throw
        const config = require('../config/appConfig');
        const { data } = req.body;

        // defensive: if not array, validation middleware should catch, but double-check
        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: 'data must be an array of strings',
            });
        }

        const result = processInputData(data);

        return res.status(200).json({
            is_success: true,
            user_id: buildUserId(config), 
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
        next(err);
    }
};

const getBfhl = (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
};

module.exports = { postBfhl, getBfhl };