import {Router  } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import multer from 'multer'
import uploadConfig from './config/upload'
const upload = multer(uploadConfig)
const routes = Router()

routes.post('/orphanages', upload.array('images') ,OrphanagesController.create)
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
export  default routes
