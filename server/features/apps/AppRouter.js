import express from 'express'
import AppController from './AppController'
const router = express.Router()

const appController = new AppController()

router.post('/', appController.createApp)
router.get('/', appController.listApps)
router.get('/:id', appController.listApp)

export default router