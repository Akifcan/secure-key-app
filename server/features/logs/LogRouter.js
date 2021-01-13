import express from 'express'
import LogController from './LogController'
const logController = new LogController()
const router = express.Router()

router.get('/', logController.getLogs)

export default router
