import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || process.env.DB_HOST,
    port: Number(process.env.MYSQLPORT || process.env.DB_PORT),
    user: process.env.MYSQLUSER || process.env.DB_USER,
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    database: process.env.MYSQLDATABASE || process.env.DB_NAME,
    ssl: process.env.MYSQLHOST ? { rejectUnauthorized: false } : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if (err) {
        console.log("❌ ERROR CONECTANDO A MYSQL:", err);
    } else {
        console.log("✅ CONECTADO A MYSQL");
        conn.release();
    }
});

var alumnosDB = {};

alumnosDB.insertar = function insertar(alumno) {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO alumnos SET ?";
        pool.query(sql, alumno, (err, res) => {
            if (err) {
                console.log("❌ Error insertar:", err);
                reject(err);
            } else {
                resolve(res.insertId);
            }
        });
    });
};

alumnosDB.mostrarTodos = function () {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM alumnos", (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
};

alumnosDB.buscarPorId = function (id) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM alumnos WHERE id = ?", [id], (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
};

alumnosDB.buscarPorMatricula = function (matricula) {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM alumnos WHERE matricula = ?", [matricula], (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
};

alumnosDB.borrarPorId = function (id) {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM alumnos WHERE id = ?", [id], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

alumnosDB.actualizarPorId = function (id, alumno) {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE alumnos SET ? WHERE id = ?", [alumno, id], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

alumnosDB.cambiarStatus = function (id) {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE alumnos SET status = NOT status WHERE id = ?", [id], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

export default alumnosDB;