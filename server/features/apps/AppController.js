import { validate } from '../../utils'
import AppModel from './AppModel'

class AppController {

    async createApp(req, res, next) {
        try {
            const { name, apiKey, description } = req.body
            const { userid: userId } = req.headers
            const app = await AppModel.create({ name, apiKey, description, userId })
            res.status(200).json({ status: true, message: 'Uygulamanız Oluşturulmuştur', app })
        } catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }

    }

    async updateApp(req, res, next) {
        try {
            const { name, apiKey, description, limit, time } = req.body
            const { id: _id } = req.params
            const app = await AppModel.updateOne(
                {
                    _id
                },
                {
                    name,
                    apiKey,
                    description,
                    limit,
                    time
                }
            )
            if (app.n == 1) {
                res.status(200).json({ status: true, message: 'Uygulamanız Güncellenmiştir' })
            } else {
                return next(new Error('Bu uygulama bulunamadı'))
            }
        } catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }

    }

    async addBlockList(req, res, next) {
        try {
            const { id: _id } = req.params
            const { ipAddress } = req.body
            const add = await AppModel.updateOne(
                {
                    _id
                },
                {
                    $push: { blockList: ipAddress }
                }
            )
            if (add.n == 1) {
                res.status(200).json({ status: true, message: `${ipAddress} yasaklı listesine eklendi.` })
            } else {
                return next(new Error('Bu uygulama bulunamadı'))
            }
        }
        catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }
    }

    async addAllowList(req, res, next) {
        try {
            const { id: _id } = req.params
            const { ipAddress } = req.body
            const add = await AppModel.updateOne(
                {
                    _id
                },
                {
                    $push: { allowList: ipAddress }
                }
            )
            if (add.n == 1) {
                res.status(200).json({ status: true, message: `${ipAddress} izin verilen listesine eklendi.` })
            } else {
                return next(new Error('Bu uygulama bulunamadı'))
            }
        }
        catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }
    }

    async removeAllowList(req, res, next) {
        try {
            const { id: _id } = req.params
            const { ipAddress } = req.body
            const add = await AppModel.updateOne(
                {
                    _id
                },
                {
                    $pull: { allowList: ipAddress }
                }
            )
            if (add.n == 1) {
                res.status(200).json({ status: true, message: `${ipAddress} izin verilen listesine kaldırıldı.` })
            } else {
                return next(new Error('Bu uygulama bulunamadı'))
            }
        }
        catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }
    }

    async removeBlockList(req, res, next) {
        try {
            const { id: _id } = req.params
            const { ipAddress } = req.body
            const add = await AppModel.updateOne(
                {
                    _id
                },
                {
                    $pull: { blockList: ipAddress }
                }
            )
            if (add.n == 1) {
                res.status(200).json({ status: true, message: `${ipAddress} yasaklı listesine kaldırıldı.` })
            } else {
                return next(new Error('Bu uygulama bulunamadı'))
            }
        }
        catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }
    }

}

export default AppController