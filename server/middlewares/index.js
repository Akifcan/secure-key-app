const IP_ADDRESS_REGEX = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
import AppModel from '../features/apps/AppModel'
import { validate } from '../utils'

export const ipIsValid = (req, res, next) => {
    if (IP_ADDRESS_REGEX.test(req.body.ipAddress)) {
        next()
    } else {
        next(new Error('Lütfen ip adresi formatını doğru girin'))
    }
}

export const ipIsUnique = async (req, res, next) => {
    const { ipAddress } = req.body
    const { id: _id } = req.params
    const ipIsExist = await AppModel.findOne().or(
        [
            { _id, blockList: { $in: [ipAddress] } },
            { _id, allowList: { $in: [ipAddress] } }
        ]
    )
    console.log(ipIsExist);
    if (!ipIsExist) {
        next()
    } else {
        const name = ipIsExist.blockList.includes(ipAddress) ? 'Yasaklı Listesine' : 'İzin Verilen Listesine'
        next(new Error(`Bu ip adresini ${name} kayıt etmişsiniz`))

    }
}

export const nameIsUnique = async (req, res, next) => {
    const { name, apiKey, description } = req.body
    const { userid: userId } = req.headers
    const result = validate(
        [
            {
                text: name || '',
                check: ['required', 'maxLength:50'],
                messages: ['Uygulama İsmini Lütfen Belirtin', 'Uygulama İsmi En Fazla 50 Karakter Olabilir']
            },
            {
                text: apiKey || '',
                check: ['required', 'maxLength:200'],
                messages: ['Api Anahtarınızı Lütfen Belirtin', 'Anahtar En Fazla 50 Karakter Olabilir']
            },
            {
                text: description || '',
                check: ['maxLength:500'],
                messages: ['Açıklama En Fazla 500 Karakter Olabilir']
            },
        ]
    )
    if (result == true) {
        const checkName = await AppModel.findOne({ name, userId })
        if (!checkName) {
            next()
        } else {
            next(new Error('Bu isimde bir uygulama oluşturmussunuz.'))
        }
    } else {
        next(new Error(result))
    }


}
