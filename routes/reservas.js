var express = require('express');
var router = express.Router();

var DBConn = require('../db-conn');
var db = new DBConn();
var id_estab;
var qtd_reservas;

/* GET home page. */
/* router.get('/', function(req, res, next) {
 res.render('reservas/novo.ejs', { title: 'Reservaí' });
}); */

router.get('/', function(req, res, next) {
  
  db.findAllReservas((err, data) =>{
      res.render('reservas/', { reservas: data});
  
    });

}); 



/*  buscar restaurante. */
router.get('/buscar/', function(req, res, next) {
  // router.post('/buscar/', function(req, res, next) {

    db.getEstabelecimentoByName(req.query.busca, (err, data) => {
       
      if (err){
        next(err);
      }
      else if (data){
        res.render('reservas/restaurantes', {restaurantes: data});
      } else{
        res.status(404).send("Restaurante não encontrado");
      }
    
     });
console.log(req.query.busca);
  
 });






/*  nova reserva. */
router.post('', function(req, res, next) {
db.getUsuarioByEmail(req.body.email, (err, data) => {
db.getCountAgendamentos(req.body.data, req.body.estabelecimento, (err_agend, data2) => {

  var errors = [];
  
//valida o email
if (req.body.email != ""){
  var validamail = req.body.email.includes("@")
    if(validamail == false){
      errors.push("E-mail inválido, insira o @ e tente novamente!")
    }
} else if (req.body.email == ""){
  errors.push("E-mail não informado!");
}

  //valida a existencia do usuário
  if (err){
    next(err);
  }
  else if (data){
  } else{
    errors.push("Usuário inexistente! Realize o cadastro e tente novamente");
  }


//valida a quantidade de reservas por dia
if (err_agend){
  next(err_agend);
}
else if(data2.contagem >= qtd_reservas){
  errors.push("Ops, o estabelecimento não está mais disponível para agendamento nesta data!");

} else {
  console.log("oi");

}
console.log(data2.contagem);


  if (errors.length == 0) {
    db.createReserva(req.body.estabelecimento, req.body.email, req.body.data, req.body.time, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/reservas/');      }
    });  
  } else {
    res.render('reservas/novo', { "errors": errors, estabelecimento: id_estab });
  }  


});
});
});


/* router.post('/new/', function(req, res, next) {
  db.getEstabelecimentoById(req.params.id, (err, data) => {
 
    var errors = [];
  

    if (errors.length == 0) {
      db.createReserva(req.body.estabelecimento, req.body.usuario, req.body.data, req.body.time, (err, data) => {
        if (err) {
          next(err);
        } else {
          res.redirect('/reservas');      }
      });  
    } else {
      res.render('reservas/novo', { "errors": errors });
    }  
 
  });
  
 }); */




/* GET novo. */
router.get('/:id', function(req, res, next) {
  db.getEstabelecimentoById(req.params.id, (err, data) => {
     
   if (err){
     next(err);
   }
   else if (data){
     res.render('reservas/novo', {estabelecimento: data});
     id_estab = data;
     qtd_reservas = data.max_reserv_dia;
   } else{
     res.status(404).send("Estabelecimento não encontrado");
     
   }
 
  });
  
 });






module.exports = router;
