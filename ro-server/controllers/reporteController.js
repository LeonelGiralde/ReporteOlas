const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function obtenerReportes(req, res) {
    try {
        await client.connect();
        const database = client.db('nombre_de_tu_base_de_datos');
        const collection = database.collection('reportes');
        const reportes = await collection.find().toArray();
        res.status(200).json(reportes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reportes', error });
    } finally {
        await client.close();
    }
}

async function agregarReporte(req, res) {
    try {
        const nuevoReporte = req.body;
        await client.connect();
        const database = client.db('nombre_de_tu_base_de_datos');
        const collection = database.collection('reportes');
        const resultado = await collection.insertOne(nuevoReporte);
        res.status(201).json({ message: 'Reporte agregado', id: resultado.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar reporte', error });
    } finally {
        await client.close();
    }
}

module.exports = {
    obtenerReportes,
    agregarReporte
};
