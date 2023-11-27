import Sequelize from 'sequelize'

import User from '../../app/Models/User'

import configDatabase from '../config/database'
import Moviments from '../../app/Models/Moviments'
import Address from '../../app/Models/Address'


const models = [User, Moviments, Address ]

class Database {
    constructor(){
        this.init()
    }
    

    init() {
    this.connection = new Sequelize(configDatabase)
    models.map((model) => model.init(this.connection))

    
        
    }
   
   
     
}

export default new Database()