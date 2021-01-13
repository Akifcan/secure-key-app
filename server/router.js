import express from 'express'
import AuthRouter from './features/auth/AuthRouter'
import AppRouter from './features/apps/AppRouter'
import LogRouter from './features/logs/LogRouter'


const router = express.Router()

router.use('/auth', AuthRouter)
router.use('/app', AppRouter)
router.use('/log', LogRouter)

export default router