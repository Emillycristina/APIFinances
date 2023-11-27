const {Router} = require('express')

import multer from 'multer'
import multerConfig from './config/multer'
import userController from '../app/Controllers/userController'
import SessionController from '../app/Controllers/SessionController'
import MovimentsController from '../app/Controllers/MovimentsController'
import AdressController from '../app/Controllers/AdressController'
import EmailConfigController from '../app/Controllers/EmailController';



const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', userController.store)

routes.post('/sessions', SessionController.store)

routes.post('/moviments', MovimentsController.store)

routes.post('/address', upload.single('file'), AdressController.store)


routes.post('/sendPasswordResetEmail', EmailConfigController.sendPasswordResetEmail)

routes.put('/users/updateSenha', userController.updateSenha)
;

module.exports = routes