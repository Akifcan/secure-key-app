import express from 'express'
import AuthRouter from './features/auth/AuthRouter'
import AppRouter from './features/apps/AppRouter'

const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/app', AppRouter)

export default router