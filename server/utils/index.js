import jwt from 'jsonwebtoken'

export const toJsonWebToken = (obj) => {
    return jwt.sign({ obj }, process.env.JWT_SECRET_ID)
}

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const validate = (fields) => {
    const errors = []
    fields.forEach(field => {
        const text = field.text.toString().trim()
        field.check.forEach((item, index) => {
            if (item == 'required') {
                if (text.length == 0) {
                    errors.push(field.messages[index])
                }
            }
            if (item == 'email') {
                if (!emailRegex.test(text)) {
                    errors.push(field.messages[index])
                }
            }
            if (item.includes('minLength')) {
                const minLength = parseInt(item.split(':')[1])
                if (text.length < minLength) {
                    errors.push(field.messages[index])
                }
            }
            if (item.includes('maxLength')) {
                const maxLength = parseInt(item.split(':')[1])
                if (text.length > maxLength) {
                    errors.push(field.messages[index])
                }
            }
            if (item.includes('startsWith')) {
                const starts = item.split(':')[1]
                if (!text.startsWith(starts)) {
                    errors.push(field.messages[index])
                }
            }
            if (item.includes('endsWith')) {
                const ends = item.split(':')[1]
                if (!text.endsWith(ends)) {
                    errors.push(field.messages[index])
                }
            }
            if (item.includes('regex')) {
                const testRegex = new RegExp(item.split(':')[1], 'g')
                if (!testRegex.test(text)) {
                    errors.push(field.messages[index])
                }
            }
            if (item == 'number') {
                if (isNaN(text)) {
                    errors.push(field.messages[index])
                }
            }
            if (item == 'string') {
                if (typeof field.text != 'string') {
                    errors.push(field.messages[index])
                }
            }
        })
    })
    return errors.length ? errors : true
}