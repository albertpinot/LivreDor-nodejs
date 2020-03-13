let connection = require('../config/db')
let moment = require('../config/moment')

moment.locale('fr')

class Message {
    // Constructeur
    constructor (row) {
        this.row = row
    }

    //Getteur
    get id () {
      return this.row.id
    }
    get content () {
        return this.row.content
    }
    get date () {
        return moment(this.row.date)
    }

    // Méthode static, permet d'enregistrer le message dans la bdd
    static create (content, cb) {
      connection.query('INSERT INTO messages SET content = ? , date = ?', [content, new Date()], (err , resultat) =>{
        if(err) throw err 
        cb(resultat)
      })  
    }

    // Méthode static, permet de récuperer les enregistrements dans la bdd
    static all (cb) {
      connection.query('SELECT * FROM messages', (err, rows) => {
        if(err) throw err 
        cb(rows.map((row) => new Message(row)))
      }) 

    }

    // Méthode static, permet de récuperer un enregistement par son id 
    static find (id, cb) {
      connection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id], (err, rows) => {
        if(err) throw err 
        cb(new Message(rows[0]))
      }) 

    }
}

module.exports = Message