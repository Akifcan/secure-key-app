import mongoose from 'mongoose'

const AppSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        maxlength: 200,
        required: true
    },
    description: {
        type: String,
        default: '',
        maxlength: 500
    },
    time: {
        type: Number,
        default: 10000,
        required: true
    },
    limit: {
        default: 10,
        type: Number,
        required: true
    },
    blockList: [],
    allowList: [],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('apps', AppSchema)