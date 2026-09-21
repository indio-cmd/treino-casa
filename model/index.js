import Database from "../config/database.js"

class Model{
constructor(){
    this.model = Database.db.define("consultas", {
id: {
   type: Database.db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
},

nome:{
    type: Database.db.Sequelize.STRING
},

medico:{
    type: Database.db.Sequelize.STRING
},

data:{
    type: Database.db.Sequelize.STRING
},


valor:{
    type: Database.db.Sequelize.INTEGER
},

hospital:{
    type: Database.db.Sequelize.STRING
},

pago:{
    type: Database.db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
}
    })
}
}

export default new Model().model
//id, nome, medico, data, valor, hospital, pago