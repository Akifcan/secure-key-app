import express from 'express'
import AppController from './AppController'
const router = express.Router()

const appController = new AppController()

router.post('/', appController.createApp)

export default router