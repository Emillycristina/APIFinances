import * as Yup from 'yup';
import Moviments from '../Models/Moviments';



class MovimentsController {
  
  async store(request, response) {
    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
      tipo: Yup.string().oneOf(['entrada', 'saida']).required(),
      data: Yup.date().required(),
      valor: Yup.number().required(),
    });

    ;

    
     
    
    try {
      await schema.validate(request.body, { abortEarly: false });

      const { descricao, tipo, data, valor } = request.body;
      const userId = request.body.userId
      
      console.log('userId:', userId);

      console.log('Request payload:', request.body);

    
       const movimento = await Moviments.create({
        descricao,
        tipo,
        data,
        valor,
        userId: userId,
       }, {
          logging: console.log,
        }
      );
  
      
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


  async index(request, response) {
    const userId = request.body.userId;
    try {
      const movimento = await Moviments.findAll({
        where: { userId: userId },
      });
      return response.json({ movimento });
    } catch (error) {
      console.error('Error fetching moviments:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Operação Read (Show): Obter um movimento por ID
  async show(request, response) {
    const { id } = request.params;
    const userId = request.body.userId;

    try {
      // Procurar o movimento no banco de dados pelo ID
      const movimento = await Moviments.findOne({
        where: {
          id: id,
          userId: userId,
        },
      });;

      // Responder com o movimento encontrado ou mensagem de erro se não encontrado
      if (!movimento) {
        return response.status(404).json({ error: 'Movimento não encontrado' });
      }

      return response.json({ movimento });
    } catch (error) {
      console.error('Error fetching moviment:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Operação Update: Atualizar um movimento por ID
  async update(request, response) {
    const { id } = request.params;
    const userId = request.body.userId;

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
      const existingMoviment = await Moviments.findOne({
        where: {
          id: id,
          userId: userId,
        },
      });
  

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
    const userId = request.body.userId;

    try {
      // Encontrar e excluir o movimento no banco de dados pelo ID
      const deletedRows = await Moviments.destroy({
        where: {
          id: id,
          userId: userId,
        },
      })
  
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
