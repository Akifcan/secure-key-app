import mongoose from 'mongoose'

const LogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['auth', 'app'],
        required: true
    },
    description: String,
    ipLocation: {},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('logs', LogSchema)