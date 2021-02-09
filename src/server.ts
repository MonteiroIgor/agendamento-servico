import 'reflect-metadata';

import express from 'express';
import index from './routes/index';

import './database';

const app = express();

app.use(express.json());
app.use(index);


app.listen(3333, () => {
    console.log("Server starter on port 3333!")
});
