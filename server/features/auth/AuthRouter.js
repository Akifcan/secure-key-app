import express from 'express'
import AuthController from './AuthController'

const router = express.Router()
const authController = new AuthController()

router.get('/auth-callback', authController.authorize)

export default router