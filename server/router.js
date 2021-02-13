import express from 'express'
import AuthRouter from './features/auth/AuthRouter'
import AppRouter from './features/apps/AppRouter'
import LogRouter from './features/logs/LogRouter'

import RequestController from './features/request/RequestController'
const requestController = new RequestController()
import { apiControl } from './middlewares'

import cors from 'cors'
const router = express.Router()

router.use('/auth', cors({ origin: 'http://localhost:8080' }), AuthRouter)
router.use('/app', cors({ origin: 'http://localhost:8080' }), AppRouter)
router.use('/log', cors({ origin: 'http://localhost:8080' }), LogRouter)
router.get('/api-service/:slug/:userId', cors(), apiControl, requestController.getApiKey)

export default router