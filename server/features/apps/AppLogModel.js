import mongoose from 'mongoose'

const dateTime = new Date()
const AppLogModelSchema = new mongoose.Schema({
    ipAddress: String,
    appId: {
        ref: 'apps',
        type: mongoose.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date(`${dateTime.getDay()}/${dateTime.getMonth()}/${dateTime.getFullYear()}`)
    },
    ipLocation: {},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('applogs', AppLogModelSchema)