export const errorMiddleware = (err, req, res) => {
    return res.status(500).json({ status: false, message: err.name })
}