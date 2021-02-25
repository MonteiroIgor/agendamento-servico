import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import index from './routes/index';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';

import '../../infra/typeorm';
import '../../../shared/container'

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(index);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
});


app.listen(3333, () => {
    console.log("Server starter on port 3333!")
});