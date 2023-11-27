import { Model, DataTypes } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: DataTypes.STRING,
        uf: DataTypes.STRING,
        logradouro: DataTypes.STRING,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        telefone: DataTypes.STRING,
        nomeCompleto: DataTypes.STRING,
        email: DataTypes.STRING,
        userImage: DataTypes.STRING,
       },
         // Coluna para a URL da imagem do usuário
      {
        sequelize,
      }
    );

    return this;
  }

 
  }


export default Address;
