import mongoose from 'mongoose'

const AppSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    apiKey: {
        type: String,
        required: true,
        maxLength: 150
    },
    blackList: [],
    whiteList: [],
    description: {
        default: '',
        type: String,
        maxLength: 500
    }
})

export default mongoose.model('apps', AppSchema)