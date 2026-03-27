import express from 'express';
import cors from 'cors';
import router from './router/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/alumnos', router);

const puerto = process.env.PORT || 3000;

app.listen(puerto, '0.0.0.0', () => {
    console.log("Servidor corriendo en puerto " + puerto);
});