import mongoose from 'mongoose'
import slug from 'slugify'

const AppSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    slug: {
        type: String
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

AppSchema.pre('save', function (next) {
    this.slug = slug(this.name)
    next();
});

export default mongoose.model('apps', AppSchema)