import * as Yup from 'yup';
import Address from '../Models/Address';
import multerConfig from '../../src/config/multer';
import { v4 as uuidv4 } from 'uuid';

class AddressController {
  async store(request, response) {
    // Define o esquema de validação usando o Yup
    const addressSchema = Yup.object().shape({
      cep: Yup.string().required(),
      uf: Yup.string().required(),
      logradouro: Yup.string().required(),
      bairro: Yup.string().required(),
      cidade: Yup.string().required(),
      telefone: Yup.string().required(),
      nomeCompleto: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    try {
      // Valida os dados da requisição
      await addressSchema.validate(request.body, { abortEarly: false });

      const {  cep, uf, logradouro, bairro, cidade, telefone, nomeCompleto, email } = request.body;

      
      const userImage = request.file.filename;


      const address = await Address.create({
        id: uuidv4(),
        cep,
        uf,
        logradouro,
        bairro,
        cidade,
        telefone,
        nomeCompleto,
        email,
        userImage,
        
      });

      return response.status(201).json({address});
      
    } catch (error) {
      // Verifica se o erro é de validação Yup
      if (error instanceof Yup.ValidationError) {

        return response.status(400).json({ error: 'Erro de validação', messages: error.errors });
      }
      
      console.error('Error creating address:', error);
      console.log('SQL Query:', error.sql);
      
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  
}

export default new AddressController();
