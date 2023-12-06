import Sequelize, { Model } from "sequelize";



class Moviments extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
        tipo: Sequelize.ENUM("entrada", "saida"),
        data: Sequelize.DATE,
        valor: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'moviments',
      }
      
    );
    

    return this;
    }

    
    
    
  }


export default Moviments;
