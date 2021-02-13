import express from 'express'
import AuthController from './features/auth/AuthController'
import AuthRouter from './features/auth/AuthRouter'

const router = express.Router()

router.use('/auth', AuthRouter)

export default router