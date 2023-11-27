const nodemailer = require('nodemailer');
import userModel from '../Models/User'
import dotenv from 'dotenv';

dotenv.config();

// Obtém as variáveis de ambiente necessárias para autenticação no Gmail
const { GMAIL_USER_EMAIL, GMAIL_PASSWORD } = process.env;


// Função para enviar e-mail de redefinição de senha
const sendPasswordResetEmail = async (destinatario, resetLink) => {
  try {
    // Verifique se o e-mail está cadastrado na tabela de usuários
    const user = await userModel.findOne({ where: { email: destinatario } });

    if (!user) {
      throw new Error('E-mail não encontrado na tabela de usuários.');
    }

     let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER_EMAIL, 
        pass: GMAIL_PASSWORD 
      }
    });

    let mailOptions = {
      from: GMAIL_USER_EMAIL,
     // to: GMAIL_USER_EMAIL,
      to: destinatario,
      subject: 'Redefinição de Senha',
      attachments: [
        {
          filename: "Finances.png",
          path:__dirname + "/../images/Finances.png",
          cid: 'headerImage', 

        },
      ],
      html:
       `
       <p><img src="cid:headerImage" alt="Header Image"></p>
       <p>Olá,</p>
       <p>Para redefinir sua senha clique <a href="${resetLink}">Aqui</a>.</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info);
    return info.response;
    
  } catch (error) {
    throw new Error(`Erro ao enviar e-mail de redefinição de senha: ${error.message}`);
  }
};

module.exports = {
  sendPasswordResetEmail
};
