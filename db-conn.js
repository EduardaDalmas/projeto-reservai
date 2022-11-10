var sqlite3 = require('sqlite3');

class DBConn {

    constructor() {
        this.db = new sqlite3.Database('db/reservai_db.db');
    }

    findAllUsuarios(callback){

        var sql = "SELECT * FROM usuarios";
        return this.db.all(sql, [], callback);

    }



    getUsuarioById(id, callback){

        var sql = "SELECT * FROM usuarios WHERE id = (?)";
        return this.db.get(sql, [id], callback);

    }

    createUsuario(nome,sexo,email,idade,passwd,usoLocalizacao, callback){
        var sql = "INSERT INTO usuarios (nome,sexo,email,idade,senha,usoLocalizacao,tipoUsuario) VALUES (?,?,?,?,?,?,'Pessoa fisica')";
        return this.db.get(sql, [nome, sexo, email,idade, passwd, usoLocalizacao], callback);
    }

  


    updateUsuario(nome, id, sexo, email, idade, senha, usoLocalizacao, callback) {
        var nome_ = nome;
        var idd = id;
        var sql = 'UPDATE usuarios SET nome = ?, sexo = ?, email = ?, idade = ?, senha = ?, usoLocalizacao = ? WHERE id = "'+idd+'"';
        
        return this.db.run(sql, [nome, sexo, email, idade, senha, usoLocalizacao], callback);
    }




    deleteUsuario(id, callback){
        var sql = "DELETE FROM usuarios WHERE id = (?)";
        return this.db.get(sql, [id], callback);
    }


}

module.exports = DBConn