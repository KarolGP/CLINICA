var express = require('express');
var router = express.Router();
const { conexion } = require('../database/conexion.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  conexion.query('SELECT * FROM medicos', (error, medicos) => {
    if(error){
      res.status(500).send('Ocurrio un error', + error)
    }else{
      res.status(200).render('medicos.hbs',{medicos})
    }
  })
});
router.get('/agregar',(req, res) => {
  res.status(200).sendFile('registro-medicos.html',{root: 'public'})
})

router.post('/guardar-medicos', (req, res) => {
  const cedula = req.body.cedula
  const nombres = req.body.nombres
  const apellidos = req.body.apellidos
  const especidalidad = req.body.especidalidad
  const consultorio = req.body.consultorio
  const correo = req.body.correo
  conexion.query(`INSERT INTO medicos (cedula, nombres, apellidos, especidalidad, consultorio, correo) VALUES (${cedula}, '${nombres}', '${apellidos}', '${especidalidad}', ${consultorio}, '${correo}')`, (error, resultado) => {
    if (error){
      res.status(500).send('Ocurrio un error en la consulta'+ error)
    } else {
      res.status(200).redirect('/medicos')
    }
  })
})

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula
  conexion.query(`DELETE FROM medicos WHERE cedula=${cedula}`, (error, resultado) => {
    if (error){
      res.status(500).send('Ocurrio un error en la consulta'+ error)
    } else {
      res.status(200).redirect('/medicos')
    }
  })
})


module.exports = router;
