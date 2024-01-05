import Sequelize, { Model } from "sequelize";
import User from "./User"; 

class Moviments extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
        tipo: Sequelize.ENUM("entrada", "saida"),
        data: Sequelize.DATE,
        valor: Sequelize.INTEGER,
        userId: {
          type: Sequelize.UUID, // ou outro tipo apropriado
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'moviments',
      }
    );

    return this;
  }

  static associate(models) {
    // Create associations here
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default Moviments;
