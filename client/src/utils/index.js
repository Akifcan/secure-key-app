import jwt from 'jsonwebtoken'

export const decodedJwt = (token) => {
    return jwt.verify(token, process.env.VUE_APP_JWTSECRET)
}