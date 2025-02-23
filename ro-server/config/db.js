import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let client;

export const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await client.connect();
        console.log("Conectado a MongoDB Atlas");
    }
    return client;
};

