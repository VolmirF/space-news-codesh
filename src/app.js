import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../docs/swagger_output.json';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

export default app;
