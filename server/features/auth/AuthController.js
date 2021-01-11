import axios from 'axios'
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
        res.send(user.data)
    }

}

export default AuthController