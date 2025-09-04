export const globalErrorHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unknown error occurred.';
    res.status(statusCode).json({ error: message });
}