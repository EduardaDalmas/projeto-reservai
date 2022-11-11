var express = require('express');
var router = express.Router();

var DBConn = require('../db-conn');
var db = new DBConn();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reservas/novo.ejs', { title: 'Reservaí' });
});

module.exports = router;
