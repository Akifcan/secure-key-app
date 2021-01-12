import AppModel from './AppModel'
import { validate, checkIpAddress } from '../../utils'

class AppController {

    async createApp(req, res, next) {
        const { userid: userId } = req.headers
        const { name, description, apiKey } = req.body

        const result = validate(
            [
                {
                    text: name || '',
                    check: ['required', 'maxLength:50'],
                    messages: ['Uygulama Adını Lütfen Belirtin', 'Uygulama Adı En Fazla 50 Karakter Olabilir']
                },
                {
                    text: description,
                    check: ['maxLength:500']
                },
                {
                    text: apiKey,
                    check: ['required', 'maxLength:150'],
                    messages: ['Api Keyini Lütfen Belirtin', 'Bu Api Key Çok Uzun']
                }
            ]
        )

        try {
            if (result == true) {
                const app = await AppModel.create({ name, description, apiKey, userId })
                res.status(200).json({
                    status: true,
                    message: 'Uygulama Oluşturulmuştur'
                })
            }

        } catch (error) {
            console.log(error);
            return next(new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin'))
        }


    }

    async listApps(req, res, next) {
        try {
            const { userid: userId } = req.headers
            const apps = await AppModel.find({ userId })
            res.status(200).json({ status: true, apps })
        } catch (error) {
            console.log(error);
            return next(new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin'))
        }
    }

    async listApp(req, res, next) {
        const { id: _id } = req.params
        try {
            const app = await AppModel.findOne({ _id })
            if (app) {
                res.status(200).json({ status: true, app })
            } else {
                res.status(404).json({ status: false, message: 'Böyle bir uygulama bulunamadı' })
            }
        } catch (error) {
            console.log(error);
            return next(new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin'))
        }
    }

    deleteApp(req, res) {
    }

    async addToBlackList(req, res) {
        try {
            const { id: _id } = req.params
            const { ipAddress } = req.body
            if (checkIpAddress(ipAddress)) {
                const add = await AppModel.updateOne(
                    { _id },
                    {
                        $push: { blackList: ipAddress }
                    }
                )
                if (add.n == 1) {
                    res.status(200).json({ status: true, message: `Kara listeye ${ipAddress} eklenmiştir ` })
                } else {
                    res.status(404).json({ status: false, message: 'Böyle bir uygulama bulunamadı' })
                }
            } else {
                res.status(400).json({ status: false, message: 'Ip Adresi Formatını Hatalı Girdiniz' })
            }

        }
        catch (error) {
            console.log(error);
            return next(new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin'))

        }
    }

    async removeToBlackList(req, res) {
        try {
            const { id: _id } = req.params
            const { ipAddress } = req.body

            const remove = await AppModel.updateOne({ _id }, { $pull: { blackList: ipAddress } })
            if (remove.n == 1) {
                res.status(200).json({ status: true, message: `Kara listeden ${ipAddress} kaldırıldı` })
            } else {
                res.status(404).json({ status: false, message: 'Böyle bir uygulama bulunamadı' })
            }

        } catch (error) {
            return next(new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin'))
        }
    }

    async addToWhiteList(req, res) {
        try {
            const { id: _id } = req.params
            const { ipAddress } = req.body
            if (checkIpAddress(ipAddress)) {
                const add = await AppModel.updateOne(
                    { _id },
                    {
                        $push: { whiteList: ipAddress }
                    }
                )
                if (add.n == 1) {
                    res.status(200).json({ status: true, message: `Beyaz listeye ${ipAddress} eklenmiştir ` })
                } else {
                    res.status(404).json({ status: false, message: 'Böyle bir uygulama bulunamadı' })
                }
            } else {
                res.status(400).json({ status: false, message: 'Ip Adresi Formatını Hatalı Girdiniz' })
            }

        }
        catch (error) {
            console.log(error);
            return next(new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin'))

        }
    }

    async removeToWhiteList(req, res) {
        try {
            const { id: _id } = req.params
            const { ipAddress } = req.body

            const remove = await AppModel.updateOne({ _id }, { $pull: { whiteList: ipAddress } })
            if (remove.n == 1) {
                res.status(200).json({ status: true, message: `Beyaz listeden ${ipAddress} kaldırıldı` })
            } else {
                res.status(404).json({ status: false, message: 'Böyle bir uygulama bulunamadı' })
            }

        } catch (error) {
            return next(new Error('Beklenmedik bir hata oluştu lütfen tekrar deneyin'))
        }
    }



}

export default AppController