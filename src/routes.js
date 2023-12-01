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

routes.get('/address/:id', AdressController.show);

// Rota para atualizar um endereço por ID
routes.put('/address/:id', AdressController.update);

// Rota para excluir um endereço por ID
routes.delete('/address/:id', AdressController.destroy);


routes.get('/moviments', MovimentsController.index);

// Rota para obter um movimento por ID
routes.get('/moviments/:id', MovimentsController.show);

// Rota para atualizar um movimento por ID
routes.put('/moviments/:id', MovimentsController.update);

// Rota para excluir um movimento por ID
routes.delete('/moviments/:id', MovimentsController.destroy);


module.exports = routes