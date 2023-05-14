import { Router } from 'express';
import { productsPost, productsGet, productsDelete, productsPut, categoryProducts } from '../controllers/products.controller.js';

const productsRoute = Router();

productsRoute.post('/insert', productsPost);
productsRoute.get('/completelist', productsGet);
productsRoute.delete('/delete/:code', productsDelete);
productsRoute.put('/update/:code', productsPut);
productsRoute.get('/category/:category', categoryProducts);

export default productsRoute;