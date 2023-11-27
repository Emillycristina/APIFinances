import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import User from '../Models/User';
import * as Yup from 'yup';

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password } = request.body;

    try {
      const userExist = await User.findOne({
        where: { email: email },
      });

      if (userExist) {
        return response.status(400).json({ error: 'User already exists!' });
      }

      const user = await User.create({
        id: uuidv4(),
        name: name,
        email: email,
        password: password,
      });

      return response.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserWithAddress(request, response) {
    const userId = request.params.userId;

    try {
      const user = await User.findByPk(userId, {
        include: 'addresses', // Carrega os endereços associados ao usuário
      });

      if (!user) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      return response.json(user);
    } catch (error) {
      console.error('Erro ao buscar dados de usuário e endereço:', error);
      return response.status(500).json({ error: 'Erro do servidor' });
    }
  }

  async updateSenha(request, response) {
    const { email, novaSenha } = request.body;

    try {
      // Verifique se o e-mail está cadastrado na tabela de usuários
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response.status(400).json({ error: 'E-mail não encontrado na tabela de usuários.' });
      }

      const hashedPassword = await bcrypt.hash(novaSenha, 10);
      // Atualize a senha na tabela de usuários
      user.password = hashedPassword;
      await user.save(); // Substitua "senha" pelo nome do campo da sua tabela

      return response.status(200).json({ success: true, message: 'Senha atualizada com sucesso.' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Erro ao trocar a senha.' });
    }
  }
}

export default new UserController();
