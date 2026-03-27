import express from 'express';
import alumnosDB from '../models/models.js';

const router = express.Router();

router.get("/todos", async (req, res) => {
    try {
        const alumnos = await alumnosDB.mostrarTodos();
        res.json(alumnos);
    } catch (error) {
        console.log("ERROR GET TODOS:", error);

        res.status(500).json({
            error: "Error al obtener alumnos",
            detalle: error,
            mensaje: error?.message || "Sin mensaje"
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
        console.log("ERROR GET MATRICULA:", error);

        res.status(500).json({
            error: "Error al buscar alumno por matrícula",
            detalle: error,
            mensaje: error?.message || "Sin mensaje"
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
        console.log("ERROR GET ID:", error);

        res.status(500).json({
            error: "Error al buscar alumno",
            detalle: error,
            mensaje: error?.message || "Sin mensaje"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const nuevoAlumno = req.body;
        const id = await alumnosDB.insertar(nuevoAlumno);

        res.status(201).json({
            id,
            mensaje: "Alumno agregado correctamente"
        });
    } catch (error) {
        console.log("ERROR POST COMPLETO:", error);

        res.status(500).json({
            error: "Error al insertar alumno",
            detalle: error,
            mensaje: error?.message || "Sin mensaje",
            stack: error?.stack || "Sin stack"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        console.log("BODY UPDATE:", req.body);

        const id = req.params.id;
        const datosActualizados = req.body;

        await alumnosDB.actualizarPorId(id, datosActualizados);

        res.json({ mensaje: "Alumno actualizado correctamente" });
    } catch (error) {
        console.log("ERROR PUT:", error);

        res.status(500).json({
            error: "Error al actualizar alumno",
            detalle: error,
            mensaje: error?.message || "Sin mensaje"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await alumnosDB.borrarPorId(id);

        res.json({ mensaje: "Alumno eliminado correctamente" });
    } catch (error) {
        console.log("ERROR DELETE:", error);

        res.status(500).json({
            error: "Error al eliminar alumno",
            detalle: error,
            mensaje: error?.message || "Sin mensaje"
        });
    }
});

router.patch("/:id/status", async (req, res) => {
    try {
        const id = req.params.id;

        await alumnosDB.cambiarStatus(id);

        res.json({ mensaje: "Estado del alumno actualizado correctamente" });
    } catch (error) {
        console.log("ERROR PATCH:", error);

        res.status(500).json({
            error: "Error al cambiar estado del alumno",
            detalle: error,
            mensaje: error?.message || "Sin mensaje"
        });
    }
});

export default router;