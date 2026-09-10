import {Sequelize} from "sequelize"

class Database {
constructor(){
    this.init()
}
init(){
    this.db = new Sequelize({
        database: "teste1",
        host: "localhost",
        username: "root",
        dialect: "mysql",
        password: ""
    })
}
}

export default new Database()