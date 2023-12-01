import * as Yup from 'yup';
import Moviments from '../Models/Moviments';

class MovimentsController {
  // Operação Create: Armazenar um novo movimento
  async store(request, response) {
    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
      tipo: Yup.string().oneOf(['entrada', 'saida']).required(),
      data: Yup.date().required(),
      valor: Yup.number().required(),
    });

    const { descricao, tipo, data, valor } = request.body;

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      console.error(err);
      
      const validationErrors = err.inner.map((error) => {
        return {
          field: error.path,
          message: error.message,
        };
      });
      
      return response.status(400).json({ errors: validationErrors });
    }

    try {
      // Criar um novo movimento no banco de dados
      const movimento = await Moviments.create({
        descricao,
        tipo,
        data,
        valor,
      });

      // Responder com o movimento criado
      return response.status(201).json(movimento);
    } catch (error) {
      // Responder com erro se houver um problema durante a criação do movimento
      return response.status(500).json({ error: 'Erro ao criar movimento', details: error.message });
    }
  }

  // Operação Read (Index): Obter todos os movimentos
  async index(request, response) {
    try {
      const moviments = await Moviments.find();
      return response.json({ moviments });
    } catch (error) {
      console.error('Error fetching moviments:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Operação Read (Show): Obter um movimento por ID
  async show(request, response) {
    const { id } = request.params;

    try {
      // Procurar o movimento no banco de dados pelo ID
      const moviment = await Moviments.findById(id);

      // Responder com o movimento encontrado ou mensagem de erro se não encontrado
      if (!moviment) {
        return response.status(404).json({ error: 'Movimento não encontrado' });
      }

      return response.json({ moviment });
    } catch (error) {
      console.error('Error fetching moviment:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Operação Update: Atualizar um movimento por ID
  async update(request, response) {
    const { id } = request.params;

    const schema = Yup.object().shape({
      descricao: Yup.string(),
      tipo: Yup.string().oneOf(['entrada', 'saida']),
      data: Yup.date(),
      valor: Yup.number(),
    });

    try {
      // Validar os dados da requisição usando Yup
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      // Responder com erros de validação se houverem
      const validationErrors = err.inner.map((error) => {
        return {
          field: error.path,
          message: error.message,
        };
      });

      return response.status(400).json({ errors: validationErrors });
    }

    try {
      // Atualizar o movimento no banco de dados
      const updatedMoviment = await Moviments.findByIdAndUpdate(
        id,
        { ...request.body },
        { new: true }
      );

      // Responder com o movimento atualizado ou mensagem de erro se não encontrado
      if (!updatedMoviment) {
        return response.status(404).json({ error: 'Movimento não encontrado' });
      }

      return response.json(updatedMoviment);
    } catch (error) {
      // Responder com erro se houver um problema durante a atualização do movimento
      return response.status(500).json({ error: 'Erro ao atualizar movimento', details: error.message });
    }
  }

  // Operação Delete: Excluir um movimento por ID
  async destroy(request, response) {
    const { id } = request.params;

    try {
      // Excluir o movimento no banco de dados
      const deletedMoviment = await Moviments.findByIdAndDelete(id);

      // Responder com mensagem de sucesso ou erro se o movimento não for encontrado
      if (!deletedMoviment) {
        return response.status(404).json({ error: 'Movimento não encontrado' });
      }

      return response.json({ message: 'Movimento excluído com sucesso' });
    } catch (error) {
      // Responder com erro se houver um problema durante a exclusão do movimento
      console.error('Error deleting moviment:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new MovimentsController();
