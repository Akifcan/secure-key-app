import AppLogModel from '../apps/AppLogModel'
import { getIpLocation } from '../../utils'

class RequestController {
    async getApiKey(req, res, next) {
        const ipAddress = '8.8.8.9'
        res.status(200).json({ apiKey: req.api.apiKey })
        const ipLocation = await getIpLocation(ipAddress)
        AppLogModel.create({ ipAddress, ipLocation, appId: req.api._id })
    }
}

export default RequestController