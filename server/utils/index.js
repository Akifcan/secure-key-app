import jwt from 'jsonwebtoken'

export const toJsonWebToken = (obj) => {
    return jwt.sign({ obj }, process.env.JWT_SECRET_ID)
}
