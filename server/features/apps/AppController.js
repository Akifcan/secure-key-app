import AppModel from './AppModel'
import { validate } from '../../utils'

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

    listApps(req, res) {
        res.send('list apps')
    }

    deleteApp(req, res) {
        res.send('delete app')
    }

    addToBlackList(req, res) {
        res.send('black list')
    }

    removeToBlackList(req, res) {
        res.send('remove to black list')
    }

    addToWhiteList(req, res) {
        res.send('white list')
    }

    removeToWhiteList(req, res) {
        res.send('remove to white list')
    }



}

export default AppController