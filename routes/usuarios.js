var express = require('express');
var router = express.Router();

var DBConn = require('../db-conn');
var db = new DBConn();


/* GET home page. */
router.get('/', function(req, res, next) {
  
    db.findAllUsuarios((err, data) =>{
        res.render('usuarios/index', { usuarios: data});
    
      });

});


/* GET pagina de cadastro usuarios. */
router.get('/novo', function(req, res, next) {
    res.render('usuarios/novo');
  });


/*  novo usuario. */
router.post('/', function(req, res, next) {

    var errors = [];
    //valida o campo nome
    if (req.body.nome == "") {
      errors.push("Nome não informado");
    } 
    //valida os caracteres do campo nome
    if (req.body.nome.length < 3) {
      errors.push("Nome deve conter pelo menos 3 caracteres.");
    } 

    //inicia validação do campo senha
    if (req.body.passwd.length < 9) {
      errors.push("A senha deve conter no mínimo 9 caracteres")
    } 

    //define caracteres para validacoes da senha
    const passwdNumeros = /[0-9]/;
    const passwdLetras = /[a-z]/;
    const passwdEspec = /[!@#$%&*]/;

    //utilizando o método test() para validar se o caractere existe na string
    //se não existe (false) ele gera o erro
    if (passwdNumeros.test(req.body.passwd) == false){
      errors.push("A senha deve conter letras, números e algum caractere especial!")
    }
    if (passwdLetras.test(req.body.passwd) == false){
      errors.push("A senha deve conter letras, números e algum caractere especial!")
    }
    if (passwdEspec.test(req.body.passwd) == false){
      errors.push("A senha deve conter algum caractere especial! (!@#$%&*)")
    }
    //termina validação do campo senha
    
    //valida o email
    if (req.body.email != ""){
      var validamail = req.body.email.includes("@")
        if(validamail == false){
          errors.push("E-mail inválido, insira o @ e tente novamente!")
        }
    } else if (req.body.email == ""){
      errors.push("E-mail não informado!");
    }

    //valida a idade do usuario
    var data = new Date();
    var nascimento = new Date(req.body.idade);

    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = ano + '-' + mes + '-' + dia;
    var anoMaiori = ano - 18;

    var mesReceb = nascimento.getMonth() + 1;
    var diaReceb = nascimento.getDate() + 1;

  //valida se o usuario tem idade maior ou igual a 18 anos
    if (nascimento.getFullYear() > anoMaiori){
      errors.push("O usuário deve ser maior de 18 anos")
    } else if (nascimento.getFullYear() == anoMaiori && mesReceb > mes){
      errors.push("O usuário deve ser maior de 18 anos")
    }else if(nascimento.getFullYear() == anoMaiori && mesReceb == mes && diaReceb > dia){
      errors.push("O usuário deve ser maior de 18 anos")
    }

    //valida se a data informada não é maior que a data atual
    if(req.body.idade > dataAtual){
      errors.push("Data de nascimento não pode ser maior que a data atual.")
    }  



    if (errors.length == 0) {
      db.createUsuario(req.body.nome, req.body.sexo, req.body.email, req.body.idade, req.body.passwd, req.body.local, (err, data) => {
        if (err) {
          next(err);
        } else {
          res.redirect('/usuarios');      }
      });  
    } else {
      res.render('usuarios/novo', { "errors": errors });
    }  
  });

/* GET Detalhes. */
router.get('/:id', function(req, res, next) {
    db.getUsuarioById(req.params.id, (err, data) => {
       
     if (err){
       next(err);
     }
     else if (data){
       res.render('usuarios/detalhe', {usuarios: data});
     } else{
       res.status(404).send("Usuario não encontrado");
     }
   
    });
    
   });


   router.post('/deletar/:id', function(req, res, next) {
    db.deleteUsuario(req.params.id, (err, data) => {
      if (err) {
        next(err);
      }else{
        res.redirect('/usuarios');
      }
    })
  });

  router.post('/editar/:id', function(req, res, next) {
    db.getUsuarioById(req.params.id, (err, data) => {
   
     if (err){
       next(err);
     }
     else if (data){
       res.render('usuarios/editar', {usuarios: data});
     } else{
       res.status(404).send("Usuario não encontrado");
     }
   
    });
    
   });

  router.post('/update/:id', function(req, res, next) {
    var errors = [];
    //valida o campo nome
    if (req.body.nome == "") {
      errors.push("Nome não informado");
    } 
    //valida os caracteres do campo nome
    if (req.body.nome.length < 3) {
      errors.push("Nome deve conter pelo menos 3 caracteres.");
    } 

    //inicia validação do campo senha
    if (req.body.passwd.length < 9) {
      errors.push("A senha deve conter no mínimo 9 caracteres")
    } 

    const passwdNumeros = /[0-9]/;
    const passwdLetras = /[a-z]/;
    const passwdEspec = /[!@#$%&*]/;

    if (passwdNumeros.test(req.body.passwd) == false){
      errors.push("A senha deve conter letras, números e algum caractere especial!")
    }
    if (passwdLetras.test(req.body.passwd) == false){
      errors.push("A senha deve conter letras, números e algum caractere especial!")
    }
    if (passwdEspec.test(req.body.passwd) == false){
      errors.push("A senha deve conter algum caractere especial! (!@#$%&*)")
    }
    //termina validação do campo senha
    
    //valida o email
    if (req.body.email != ""){
      var validamail = req.body.email.includes("@")
        if(validamail == false){
          errors.push("E-mail inválido, insira o @ e tente novamente!")
        }
    } else if (req.body.email == ""){
      errors.push("E-mail não informado!");
    }

    //valida a idade do usuario
    var data = new Date();
    var nascimento = new Date(req.body.idade);

    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = ano + '-' + mes + '-' + dia;
    var anoMaiori = ano - 18;

    var mesReceb = nascimento.getMonth() + 1;
    var diaReceb = nascimento.getDate() + 1;

  //valida se o usuario tem idade maior ou igual a 18 anos
    if (nascimento.getFullYear() > anoMaiori){
      errors.push("O usuário deve ser maior de 18 anos")
    } else if (nascimento.getFullYear() == anoMaiori && mesReceb > mes){
      errors.push("O usuário deve ser maior de 18 anos")
    }else if(nascimento.getFullYear() == anoMaiori && mesReceb == mes && diaReceb > dia){
      errors.push("O usuário deve ser maior de 18 anos")
    }

    //valida se a data informada não é maior que a data atual
    if(req.body.idade > dataAtual){
      errors.push("Data de nascimento não pode ser maior que a data atual.")
    }  

    if (errors.length == 0) {


    db.updateUsuario(req.body.nome, req.params.id, req.body.sexo, req.body.email, req.body.idade, req.body.passwd, req.body.local, (err, data) => {
      if (err) {
        next(err);
      } else {
  
        res.redirect('/usuarios');  
      } 
    }); 
  
    } else {
      res.render('usuarios/editar', {usuarios: req.params.id, "errors": errors});
      

    }  
  });



  




module.exports = router;
