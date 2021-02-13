import LogModel from './LogModel'

class LogController {
    async getLogs(req, res) {
        const { userid: userId } = req.headers
        const limit = req.query.limit ? true : false
        const logs = await LogModel.find({ userId }).limit(limit ? 10 : false).sort({ createdAt: -1 })
        res.status(200).json(logs)
    }
}

export default LogController