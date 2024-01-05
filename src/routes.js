const {Router} = require('express')


import multer from 'multer'
import multerConfig from './config/multer'
import userController from '../app/Controllers/userController'
import SessionController from '../app/Controllers/SessionController'
import MovimentsController from '../app/Controllers/MovimentsController'
import AdressController from '../app/Controllers/AdressController'
import EmailConfigController from '../app/Controllers/EmailController'
import passport from '../app/Controllers/Passport'




const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', userController.store)

routes.put('/users/updateSenha', userController.updateSenha)

routes.post('/sessions', SessionController.store)

routes.post('/sendPasswordResetEmail', EmailConfigController.sendPasswordResetEmail)

routes.use(passport.authenticate('jwt', { session: false }));

routes.post('/address', upload.single('file'), AdressController.store)

routes.put('/address/:id', upload.single('file'), AdressController.update)

routes.get('/address', AdressController.index);

routes.get('/address/:id', AdressController.show);

routes.delete('/address/:id', AdressController.destroy);

routes.post('/moviments', MovimentsController.store)

routes.get('/moviments', MovimentsController.index);

routes.get('/moviments/:id', MovimentsController.show);

routes.put('/moviments/:id', MovimentsController.update);

routes.delete('/moviments/:id', MovimentsController.destroy);


module.exports = routes