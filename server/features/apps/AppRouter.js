import express from 'express'
import AppController from './AppController'
const router = express.Router()

const appController = new AppController()

router.post('/', appController.createApp)
router.get('/', appController.listApps)
router.get('/:id', appController.listApp)
router.post('/add-black-list/:id', appController.addToBlackList)
router.post('/add-white-list/:id', appController.addToWhiteList)
router.post('/remove-black-list/:id', appController.removeToBlackList)
router.post('/remove-white-list/:id', appController.removeToWhiteList)



export default router