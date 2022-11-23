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

    getUsuarioByEmail(email, callback){

        var sql = "SELECT email FROM usuarios WHERE email = (?)";
        return this.db.get(sql, [email], callback);

    }

    getCountAgendamentos(data,id, callback){
        var sql = "SELECT Count(*) AS contagem from agendamentos where data = (?) and estabelecimento = (?)";
        return this.db.get(sql, [data,id], callback);

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


    findAllEstabelecimentos(callback){

        var sql = "SELECT * FROM estabelecimentos";
        return this.db.all(sql, [], callback);

    }

    findAllReservas(callback){

        var sql = "SELECT p.usuario, p.data, p.time, c.razaosocial FROM agendamentos P INNER JOIN estabelecimentos c ON p.estabelecimento = c.id_estabelecimento ";
        return this.db.all(sql, [], callback);

    }

    getEstabelecimentoById(id_estabelecimento, callback){

        var sql = "SELECT * FROM estabelecimentos WHERE id_estabelecimento = (?)";
        return this.db.get(sql, [id_estabelecimento], callback);

    }

    getEstabelecimentoByName(razaosocial, callback){
        var raz = razaosocial;
        var sql = "SELECT * FROM estabelecimentos WHERE razaosocial = (?) " ;
        return this.db.get(sql, [razaosocial], callback);

    }


    createReserva(estabelecimento,usuario,data,time, callback){
        var sql = "INSERT INTO agendamentos (estabelecimento,usuario,data,time) VALUES (?,?,?,?)";
        return this.db.get(sql, [estabelecimento, usuario, data,time], callback);
    }


}

module.exports = DBConn