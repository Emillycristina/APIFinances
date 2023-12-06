import * as Yup from 'yup';
import Moviments from '../Models/Moviments';
const { isDate, parse } = require('date-fns');

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
      await schema.validate(request.body, { abortEarly: false });
  
    
       const movimento = await Moviments.create({
        descricao,
        tipo,
        data,
        valor,
      });
  
      // Responder com o movimento criado
      return response.status(201).json(movimento);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = err.inner.map((error) => {
          return {
            field: error.path,
            message: error.message,
          };
        });
        
        return response.status(400).json({ errors: validationErrors });
      }
  
      return response.status(500).json({ error: 'Erro ao criar movimento', details: err.message });
    }
  }

  // Operação Read (Index): Obter todos os movimentos
  async index(request, response) {
    try {
      const moviments = await Moviments.findAll();
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
      const moviment = await Moviments.findByPk(id);

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
      // Verificar se o movimento existe
      const existingMoviment = await Moviments.findByPk(id);

      if (!existingMoviment) {
        return response.status(404).json({ error: 'Movimento não encontrado' });
      }

      

      await existingMoviment.update({ ...request.body});


      // Recuperar o movimento atualizado
      const updatedMoviment = await Moviments.findByPk(id);

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
      // Encontrar e excluir o movimento no banco de dados pelo ID
      const deletedRows = await Moviments.destroy({
        where: {
          id: id
        }
      });
  
      // Verificar se algum registro foi excluído
      if (deletedRows === 0) {
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
