import jwt from 'jsonwebtoken'

export const decodedJwt = (token) => {
    return jwt.verify(token, process.env.VUE_APP_JWTSECRET)
}

export const isTokenExist = _ => localStorage.userToken ? true : false

export const removeToken = _ => delete localStorage.userToken