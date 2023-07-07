var express = require('express');
var router = express.Router();
const {conexion} = require('../database/conexion.js')

/* GET medicos*/
router.get('/', function(req, res, next) {
  conexion.query('SELECT * FROM cita_medica', function(error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    }else{
    res.render('citas', { citas: results });
    }
  });
});

router.get('/agregar-cita', (req, res) =>{
  res.sendFile('registro-citas.html', {root: 'public'});
})

router.post('/agregar', (req, res) =>{
  const cedula_paciente = req.body.cedula_paciente;
  const fecha = req.body.fecha;
  const especidalidad = req.body.especidalidad;

  conexion.query(`SELECT cedula FROM medicos WHERE especidalidad='${especidalidad}';`, function(error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    }
      const cedula_medico = results[0].cedula;
      conexion.query(`INSERT INTO cita_medica (cedula_paciente, cedula_medico, fecha) VALUES (${cedula_paciente}, ${cedula_medico}, '${fecha}')`, (error, result) => {
        if (error) {
          console.log("Ocurrio un error en la ejecución", error)
          res.status(500).send("Error en la consulta");
        }else{
          res.redirect('/citas');
        }
      });
  });
})

module.exports = router;