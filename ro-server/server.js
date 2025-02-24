import express from 'express';
import { connectToDatabase } from './config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa el paquete cors
import { ObjectId } from 'mongodb';


const app = express();
const PORT = process.env.PORT || 5000;
let db;

// Middleware para habilitar CORS
app.use(cors()); // Habilita CORS para todas las rutas

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conectar a la base de datos
connectToDatabase()
    .then(client => {
        db = client.db('ReporteOlas');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error al iniciar el servidor:", err);
    });

// Rutas
app.get('/api/reportes', async (req, res) => {
    try {
        const reportes = await db.collection('reportes').find().toArray();
        res.json(reportes);
    } catch (error) {
        res.status(500).send("Error al obtener los reportes.");
    }
});

app.post('/api/reportes', async (req, res) => {
    const { fecha, reportes } = req.body;

    try {
        await db.collection('reportes').insertOne({ fecha, reportes });
        res.status(201).json({ message: 'Reporte guardado exitosamente.' });
    } catch (error) {
        res.status(500).send("Error al guardar el reporte.");
    }
});

// Ruta para obtener un reporte específico por ID
app.get('/api/reportes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const reporte = await db.collection('reportes').findOne({ _id: new ObjectId(id) });
        if (!reporte) {
            return res.status(404).send('Reporte no encontrado');
        }
        res.json(reporte);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});

// Ruta para eliminar un reporte
app.delete('/api/reportes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.collection('reportes').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send('Reporte no encontrado');
        }
        res.status(200).json({ message: 'Reporte eliminado exitosamente.' });
    } catch (error) {
        res.status(500).send('Error al eliminar el reporte');
    }
});

// Ruta para actualizar un reporte (opcional)
app.put('/api/reportes/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, reportes } = req.body;
    try {
        const result = await db.collection('reportes').updateOne(
            { _id: new ObjectId(id) },
            { $set: { fecha, reportes } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).send('Reporte no encontrado');
        }
        res.status(200).json({ message: 'Reporte actualizado exitosamente.' });
    } catch (error) {
        res.status(500).send('Error al actualizar el reporte');
    }
});
