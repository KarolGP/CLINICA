const mysql = require('mysql')
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Karol',
    database: 'clinica'
})

conexion.connect(function(error){
    if(error){
        console.log('Ocurio un error en la base de datos');
        return;
    }else{
        console.log('¡Conexion Exitosa!')
    }
})

module.exports = {conexion}