import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.routes.js';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(cors());

app.use('/products', productsRouter);

app.listen(1234, () => {
    console.log(`Server is running at http://localhost:1234`);
});