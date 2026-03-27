import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

var conexion = mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conexion.connect((err) => {
    if (err) {
        console.log("Surgió un error al conectar: " + err);
    } else {
        console.log("Conexión a la base de datos exitosa");
    }
});

var alumnosDB = {};

alumnosDB.insertar = function insertar(alumno) {
    return new Promise((resolve, reject) => {
        let sqlConsulta = "INSERT INTO alumnos SET ?";
        conexion.query(sqlConsulta, alumno, (err, res) => {
            if (err) {
                console.log("Error al insertar: " + err);
                reject(err);
            } else {
                resolve(res.insertId);
            }
        });
    });
};

alumnosDB.mostrarTodos = function mostrarTodos() {
    return new Promise((resolve, reject) => {
        let sqlConsulta = "SELECT * FROM alumnos";
        conexion.query(sqlConsulta, (err, resultado) => {
            if (err) {
                console.log("Error al obtener alumnos: " + err);
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

alumnosDB.buscarPorId = function buscarPorId(id) {
    return new Promise((resolve, reject) => {
        let sqlConsulta = "SELECT * FROM alumnos WHERE id = ?";
        conexion.query(sqlConsulta, [id], (err, resultado) => {
            if (err) {
                console.log("Error al buscar por ID: " + err);
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

alumnosDB.buscarPorMatricula = function buscarPorMatricula(matricula) {
    return new Promise((resolve, reject) => {
        let sqlConsulta = "SELECT * FROM alumnos WHERE matricula = ?";
        conexion.query(sqlConsulta, [matricula], (err, resultado) => {
            if (err) {
                console.log("Error al buscar por matrícula: " + err);
                reject(err);
            } else {
                resolve(resultado);
            }
        });
    });
};

alumnosDB.borrarPorId = function borrarPorId(id) {
    return new Promise((resolve, reject) => {
        let sqlConsulta = "DELETE FROM alumnos WHERE id = ?";
        conexion.query(sqlConsulta, [id], (err, resultado) => {
            if (err) {
                console.log("Error al borrar alumno: " + err);
                reject(err);
            } else {
                resolve("Alumno eliminado correctamente");
            }
        });
    });
};

alumnosDB.actualizarPorId = function actualizarPorId(id, nuevoAlumno) {
    return new Promise((resolve, reject) => {
        let sqlConsulta = "UPDATE alumnos SET ? WHERE id = ?";
        conexion.query(sqlConsulta, [nuevoAlumno, id], (err, resultado) => {
            if (err) {
                console.log("Error al actualizar alumno: " + err);
                reject(err);
            } else {
                resolve("Alumno actualizado correctamente");
            }
        });
    });
};

alumnosDB.cambiarStatus = function cambiarStatus(id) {
    return new Promise((resolve, reject) => {
        let sqlConsulta = "UPDATE alumnos SET status = NOT status WHERE id = ?";
        conexion.query(sqlConsulta, [id], (err, resultado) => {
            if (err) {
                console.log("Error al cambiar status: " + err);
                reject(err);
            } else {
                resolve("Status actualizado correctamente");
            }
        });
    });
};

export default alumnosDB;