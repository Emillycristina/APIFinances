// EmailConfigController.js

import emailModel from './configEmail';
import jwt from 'jsonwebtoken';
import userModel from '../Models/User';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_JWT } = process.env;

class EmailConfigController {
    constructor() {
       
        this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this);
        this.generateUniqueToken = this.generateUniqueToken.bind(this);
      }
      
    async sendPasswordResetEmail(req, res) {
        const destinatario = req.body.destinatario;
        
        try {
            console.log('Iniciando sendPasswordResetEmail...');

            // Adicionando log para verificar o valor de 'this'
            console.log('Valor de "this":', this);
      
            // Adicionando log antes de chamar generateUniqueToken
            console.log('Destinatario antes de chamar generateUniqueToken:', destinatario);
      


          const resetToken = await this.generateUniqueToken(destinatario); 
    
          

          const tokenStorage = {};
          tokenStorage[destinatario] = resetToken;
    
          // Obtém o usuário associado ao e-mail
          const user = await userModel.findOne({ where: { email: destinatario } });
    
          if (!user) {
            return res.status(400).json({ error: 'E-mail não encontrado na tabela de usuários.' });
          }
    
          // Armazena o token na tabela de usuários
          user.resetToken = resetToken;
          await user.save();
          

          const baseUrl= 'https://finances-front-gilt.vercel.app/ForgotPassword'
          // Construa o link de redefinição de senha
          const resetLink = `${baseUrl}?token=${resetToken.toString()}`;
    
          // Envie o e-mail com o link de redefinição de senha
          try {
            await emailModel.sendPasswordResetEmail(destinatario, resetLink);
            return res.status(200).json({ success: true, message: 'E-mail enviado com sucesso.' });
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
          }
        } catch (error) {
            console.error('Erro ao processar sendPasswordResetEmail:', error);
          return res.status(500).json({ error: 'Erro ao verificar o e-mail no banco de dados.' });
        }
      }
      async generateUniqueToken(destinatario) {
        try {
          const user = await userModel.findOne({ where: { email: destinatario } });
      
          if (!user) {
            console.log('E-mail não encontrado na tabela de usuários.');
          }
          
          
            const secret = TOKEN_JWT;
        
            // Substitua { userID: 'seuUserID', email: destinatario } pelos dados que você deseja incluir no token
            const tokenData = { userID: user.id };
        
            const tokenOptions = { expiresIn: '1h' };
        
            const generatedToken = jwt.sign(tokenData, secret, tokenOptions);
            console.log(generatedToken);
        
            return generatedToken;
          
        } catch (error) {
          console.error('Erro durante a geração do token:', error);
          throw error; 
        }
      }
    
    }
    
    export default new EmailConfigController();