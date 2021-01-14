import { createLog, getAppName } from '../../utils'
import AppModel from './AppModel'
import AppLogModel from './AppLogModel'
import mongoose from 'mongoose'

class AppController {

    async createApp(req, res, next) {
        try {
            const { name, apiKey, description } = req.body
            const { userid: userId } = req.headers
            const app = await AppModel.create({ name, apiKey, description, userId })
            res.status(200).json({ status: true, message: 'Uygulamanız Oluşturulmuştur', app })
            createLog({
                type: 'app',
                userId,
                description: `${name} adında yeni bir uygulama oluşturdunuz`
            })

        } catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }

    }



    async deleteApp(req, res, next) {
        try {
            const { id: _id } = req.params
            const { userid: userId } = req.headers
            const appName = await getAppName(_id)
            const deleteApp = await AppModel.deleteOne({ _id, userId })
            res.status(200).json({ status: true, message: 'Uygulamanız kaldırılmıştır' })
            createLog({
                type: 'app',
                userId,
                description: `${appName} uygulamasını kaldırdınız`
            })
        } catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }
    }

    async updateApp(req, res, next) {
        try {
            const { name, apiKey, description, limit, time } = req.body
            const { id: _id } = req.params
            const { userid: userId } = req.headers
            const appName = await getAppName(_id)
            const app = await AppModel.updateOne(
                {
                    _id,
                    userId
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
                createLog({
                    type: 'app',
                    userId,
                    description: `${appName} uygulamasını güncellediniz - (${name}) `
                })
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
            const { userid: userId } = req.headers
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
                createLog({
                    type: 'app',
                    userId,
                    description: `${ipAddress}'ini yasaklı listeye eklediniz`
                })
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
            const { userid: userId } = req.headers
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
                createLog({
                    type: 'app',
                    userId,
                    description: `${ipAddress}'ini izin verilen listeye eklediniz`
                })

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
                createLog({
                    type: 'app',
                    userId,
                    description: `${ipAddress}'ini yasaklı listesinden kaldırdınız`
                })

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
                createLog({
                    type: 'app',
                    userId,
                    description: `${ipAddress}'ini izin verilen listesinden kaldırdınız`
                })

            } else {
                return next(new Error('Bu uygulama bulunamadı'))
            }
        }
        catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }
    }

    async getAppLogs(req, res, next) {
        try {
            const { id: appId } = req.params
            const logs = await AppLogModel.find({ appId })
            res.status(200).json(logs)
        } catch (error) {
            console.log(error);
            return next(new Error('Beklenemdik bir hata oluştu lütfen tekrar deneyin.'))
        }
    }

    async getLogsByDate(req, res, next) {
        const { id: appId } = req.params
        const dates = await AppLogModel.aggregate(
            [
                {
                    $match: { appId: mongoose.Types.ObjectId(appId) }
                },
                {
                    $group: {
                        _id: "$date",
                        total: { $sum: 1 }
                    }
                }
            ]
        )
        res.status(200).json(dates)
    }


}

export default AppController