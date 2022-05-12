// API IMPORTS
// --UTILS
import express from 'express';

// --ROUTES
import execmd from './routes/execmd';

// API INITILIZATIONS
const app: express.Application = express();

app.use(express.json());

// API ROUTES

app.get('/', (_: express.Request, res: express.Response) => {
  res.status(200).send('<h1>API PARA EL EJERCICIO DEL GRUPO 103 - 11 de mayo de 2022</h1>');
});

app.use('/execmd', execmd);

// Find 404
app.use((_: express.Request, res: express.Response, next) => {
  res.status(404).send('<h1>404 NOT FOUND</h1>');
  next();
});

export default app;
