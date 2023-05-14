'use strict';
import { Router } from 'express';
import { cartPost, cartGet, cartPut,cartBuy } from '../controllers/cart.controller.js';

const cartRoute = Router();

//CARGAR UN PRODUCTO EN EL CARRITO DE UN USUARIO
cartRoute.post('/:email', cartPost);

//TERMINAR LA COMPRA
cartRoute.post('/buy/:email', cartBuy);

//OBTENER EL CARRITO DE UN USUARIO
cartRoute.get('/:email', cartGet);
//BORRAR UN PRODUCTO DEL CARRITO
cartRoute.put('/:email', cartPut);

export default cartRoute;