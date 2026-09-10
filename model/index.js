import Database from "../config/database.js"

class Model{
constructor(){
    this.model = Database.db.define("")
}
}

export default new Model().model