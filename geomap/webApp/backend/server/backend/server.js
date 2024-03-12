import { errorHandler, notFound } from './middleware/errorMiddleware.js';

import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv';
import express from 'express';
import fileUploadRoutes from './routes/fileUploadRoutes.js'
import mapRoutes from './routes/mapRoutes.js'
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
connectDB(app);

app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/get', mapRoutes);
app.use('/api/files', fileUploadRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));