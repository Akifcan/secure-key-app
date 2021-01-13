import axios from 'axios'
import { toJsonWebToken, createLog } from '../../utils'
class AuthController {

    async authorize(req, res) {
        const { code } = req.query
        const clientId = process.env.GITHUB_CLIENT_ID
        const secretId = process.env.GITHUB_SECRET_ID
        const response = await axios({
            method: 'POST',
            url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secretId}&code=${code}`,
            headers: {
                'accept': 'application/json'
            }
        })
        const { access_token } = response.data
        const user = await axios({
            method: 'GET',
            url: "https://api.github.com/user",
            headers: {
                'authorization': `token ${access_token}`
            }
        })
        const { login, avatar_url, email, name, id } = user.data
        res.redirect(`http://localhost:8080/login?token=${toJsonWebToken({ login, avatar_url, email, name, id })}`)
        createLog({
            type: 'auth',
            description: 'Giriş Yaptınız',
            userId: id
        })
    }

}

export default AuthController