import express from 'express';
import cors from 'cors';
import router from './router/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/alumnos', router);

const puerto = 3000;
app.listen(puerto, () => {
    console.log("Servidor iniciado en puerto " + puerto);
});