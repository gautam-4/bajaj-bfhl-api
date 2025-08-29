module.exports = (err, req, res, _next) => {
    console.error(err);
    res.status(500).json({
        is_success: false,
        error: err && err.message ? err.message : 'Internal Server Error',
    });
};
