import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.routes.js';
import { usersRouter } from './routes/users.routes.js';
import { categoriesRouter } from './routes/categories.routes.js';

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(cors());

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

const port = process.env.PORT ?? 1234

app.listen(port, () => {
    console.log(`Server is running at http://localhost:1234`);
});