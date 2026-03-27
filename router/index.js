import express from 'express';
import alumnosDB from '../models/models.js';

const router = express.Router();

router.get("/todos", async (req, res) => {
    try {
        const alumnos = await alumnosDB.mostrarTodos();
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener alumnos",
            detalle: error.message
        });
    }
});

router.get("/matricula/:matricula", async (req, res) => {
    try {
        const alumno = await alumnosDB.buscarPorMatricula(req.params.matricula);
        if (alumno.length > 0) {
            res.json(alumno[0]);
        } else {
            res.status(404).json({ error: "Alumno no encontrado" });
        }
    } catch (error) {
        res.status(500).json({
            error: "Error al buscar alumno por matrícula",
            detalle: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const alumno = await alumnosDB.buscarPorId(req.params.id);
        if (alumno.length > 0) {
            res.json(alumno[0]);
        } else {
            res.status(404).json({ error: "Alumno no encontrado" });
        }
    } catch (error) {
        res.status(500).json({
            error: "Error al buscar alumno",
            detalle: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const nuevoAlumno = req.body;
        const id = await alumnosDB.insertar(nuevoAlumno);

        res.status(201).json({
            id,
            mensaje: "Alumno agregado correctamente"
        });
    } catch (error) {
        console.log("ERROR POST:", error);

        res.status(500).json({
            error: "Error al insertar alumno",
            detalle: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActualizados = req.body;

        await alumnosDB.actualizarPorId(id, datosActualizados);

        res.json({ mensaje: "Alumno actualizado correctamente" });
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar alumno",
            detalle: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await alumnosDB.borrarPorId(id);

        res.json({ mensaje: "Alumno eliminado correctamente" });
    } catch (error) {
        res.status(500).json({
            error: "Error al eliminar alumno",
            detalle: error.message
        });
    }
});

router.patch("/:id/status", async (req, res) => {
    try {
        const id = req.params.id;

        await alumnosDB.cambiarStatus(id);

        res.json({ mensaje: "Estado del alumno actualizado correctamente" });
    } catch (error) {
        res.status(500).json({
            error: "Error al cambiar estado del alumno",
            detalle: error.message
        });
    }
});

export default router;