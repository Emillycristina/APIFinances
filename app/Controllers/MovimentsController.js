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

    const { descricao, tipo, data, valor } = request.body;

    try {
        await schema.validateSync(request.body, { abortEarly: false });
      } catch (err) {
        console.error(err); // ou use um sistema de log para registrar o erro
      
        const validationErrors = err.inner.map((error) => {
          return {
            field: error.path,
            message: error.message,
          };
        });
      
        return response.status(400).json({ errors: validationErrors });
      }
      

    

    try {
      const movimento = await Moviments.create({
        descricao,
        tipo,
        data,
        valor,
      });

      return response.status(201).json(movimento);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar movimento', details: error.message });
    }
  }
}

export default new MovimentsController();
