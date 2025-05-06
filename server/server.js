import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '.env') });


import express from 'express'
import mongoose from 'mongoose'
import cors from'cors'

import todoRoutes from './routes/todoRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/todos', todoRoutes);

mongoose.connect(process.env.MONGO_URI).then(()=> console.log("Database connected!")).catch(err=>console.log(err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
