import Sequelize, { Model } from "sequelize";
import User from './User';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: Sequelize.STRING,
        uf: Sequelize.STRING,
        logradouro: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        telefone: Sequelize.STRING,
        nomeCompleto: Sequelize.STRING,
        email: Sequelize.STRING,
        userImage: Sequelize.STRING,
        userId: Sequelize.INTEGER, // Add a foreign key field
       },
         // Coluna para a URL da imagem do usuário
      {
        sequelize,
        tableName: 'Addresses',
        timestamps: true, // Se quiser usar created_at e updated_at
        underscored: true,
        underscoredAll: true,
      }
    );

    return this;
  }  

  static associate(models) {
    // Create associations here
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
 
  }


export default Address;
