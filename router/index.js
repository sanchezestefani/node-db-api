import express from 'express';
import alumnosDB from '../models/models.js';

const router = express.Router();

router.get("/todos", async (req, res) => {
    try {
        res.json(await alumnosDB.mostrarTodos());
    } catch (error) {
        res.status(500).json({ error, mensaje: error.message });
    }
});

router.get("/matricula/:matricula", async (req, res) => {
    try {
        const data = await alumnosDB.buscarPorMatricula(req.params.matricula);
        data.length ? res.json(data[0]) : res.status(404).json({ error: "No encontrado" });
    } catch (error) {
        res.status(500).json({ error, mensaje: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await alumnosDB.buscarPorId(req.params.id);
        data.length ? res.json(data[0]) : res.status(404).json({ error: "No encontrado" });
    } catch (error) {
        res.status(500).json({ error, mensaje: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const id = await alumnosDB.insertar(req.body);
        res.status(201).json({ id, mensaje: "Alumno agregado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, mensaje: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        await alumnosDB.actualizarPorId(req.params.id, req.body);
        res.json({ mensaje: "Actualizado" });
    } catch (error) {
        res.status(500).json({ error, mensaje: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await alumnosDB.borrarPorId(req.params.id);
        res.json({ mensaje: "Eliminado" });
    } catch (error) {
        res.status(500).json({ error, mensaje: error.message });
    }
});

router.patch("/:id/status", async (req, res) => {
    try {
        await alumnosDB.cambiarStatus(req.params.id);
        res.json({ mensaje: "Status cambiado" });
    } catch (error) {
        res.status(500).json({ error, mensaje: error.message });
    }
});

export default router;