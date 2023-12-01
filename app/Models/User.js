import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt'

class User extends Model {
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      
    },
    {
      sequelize,
    }
     )

     this.addHook('beforeSave', async(user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password,10)
      }
     })

     return this
  }
  
  

  checkPassword(password){
    console.log('Comparando senhas:', password.trim(), this.password_hash);
    return bcrypt.compare(password.trim(), this.password_hash);
    
  }
}



export default User
