import * as Yup from 'yup';
import User from '../Models/User';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { TOKEN_JWT } = process.env;

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const userEmailOrPasswordIncorrect = () => {
      return response.status(401).json({ error: 'Make sure password or email are correct' });
    };

    try {
      if (!(await schema.isValid(request.body))) {
        return userEmailOrPasswordIncorrect();
      }

      const { email, password } = request.body;
      const secret = TOKEN_JWT;

      const user = await User.findOne({
        where: { email },
      });

      console.log('Usuário encontrado:', user);

      if (!user) {
        return userEmailOrPasswordIncorrect();
      }

      if (!(await user.checkPassword(password.trim()))) {
        console.log('Verificação de senha falhou para o usuário:', user.email);
        return userEmailOrPasswordIncorrect();
      }

      const token = Jwt.sign({ id: user.id }, secret, { expiresIn: '5d' });
     

      return response.status(200).json({
        id: user.id,
        email,
        name: user.name,
        token,
      });
    } catch (error) {
      console.error('Erro na geração do token:', error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new SessionController();
