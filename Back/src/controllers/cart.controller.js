'use strict';
import Cart from '../dao/handlerCartDAO.js';
const instanceOfCart = new Cart();

export const cartPost = (req, res) => {
    instanceOfCart.addProductToCart(req.params.email, req.body)
        .then(info => res.send({ info }))
        .catch(error => res.send({ error }))
}
export const cartGet = (req, res) => {
    instanceOfCart.readCartFromUser(req.params.email)
        .then(info => res.send({ info }))
        .catch(error => res.send({ error }))
}

export const cartPut = (req, res) => {
    instanceOfCart.deleteProductFromCart(req.params.email, req.body)
        .then(info => res.send({ info }))
        .catch(error => res.send({ error }))
}
export const cartBuy = (req, res) => {
    instanceOfCart.endBuy(req.params.email, req.body)
        .then(info => res.send({ info }))
        .catch(error => res.send({ error }))
}