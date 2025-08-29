// minimal validation without extra deps
const bfhlBody = (req, res, next) => {
    const { data } = req.body || {};
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            error: '`data` must be an array',
        });
    }

    // Allow anything coercible to string, but give a friendly nudge if objects
    const bad = data.find((x) => x !== null && typeof x === 'object');
    if (bad !== undefined) {
        return res.status(400).json({
            is_success: false,
            error: 'Array elements must be primitives (strings/numbers/symbols), not objects/arrays',
        });
    }

    next();
};

module.exports = { bfhlBody };
