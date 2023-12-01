import * as Yup from 'yup';
import Address from '../Models/Address';
import multerConfig from '../../src/config/multer';
import { v4 as uuidv4 } from 'uuid';

class AddressController {
  async store(request, response) {
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
      await addressSchema.validate(request.body, { abortEarly: false });

      const { cep, uf, logradouro, bairro, cidade, telefone, nomeCompleto, email } = request.body;

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

      return response.status(201).json({ address });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({ error: 'Erro de validação', messages: error.errors });
      }

      console.error('Error creating address:', error);
      console.log('SQL Query:', error.sql);

      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async index(request, response) {
    try {
      const addresses = await Address.find();
      return response.json({ addresses });
    } catch (error) {
      console.error('Error fetching addresses:', error);
      console.log('SQL Query:', error.sql);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async show(request, response) {
    const { id } = request.params;

    try {
      const address = await Address.findById(id);

      if (!address) {
        return response.status(404).json({ error: 'Endereço não encontrado' });
      }

      return response.json({ address });
    } catch (error) {
      console.error('Error fetching address:', error);
      console.log('SQL Query:', error.sql);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(request, response) {
    const { id } = request.params;

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
      await addressSchema.validate(request.body, { abortEarly: false });

      const { cep, uf, logradouro, bairro, cidade, telefone, nomeCompleto, email } = request.body;

      const updatedAddress = await Address.findByIdAndUpdate(
        id,
        {
          cep,
          uf,
          logradouro,
          bairro,
          cidade,
          telefone,
          nomeCompleto,
          email,
        },
        { new: true } // Retorna o objeto atualizado
      );

      if (!updatedAddress) {
        return response.status(404).json({ error: 'Endereço não encontrado' });
      }

      return response.json({ address: updatedAddress });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return response.status(400).json({ error: 'Erro de validação', messages: error.errors });
      }

      console.error('Error updating address:', error);
      console.log('SQL Query:', error.sql);

      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async destroy(request, response) {
    const { id } = request.params;

    try {
      const deletedAddress = await Address.findByIdAndDelete(id);

      if (!deletedAddress) {
        return response.status(404).json({ error: 'Endereço não encontrado' });
      }

      return response.json({ message: 'Endereço excluído com sucesso' });
    } catch (error) {
      console.error('Error deleting address:', error);
      console.log('SQL Query:', error.sql);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AddressController();
