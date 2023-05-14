import userModel from "./models/modelUsers.js";
import Products from "./handlerProductsDAO.js";
import sendMail from "../services/mailer.js";

const instanceOfProducts = new Products();

class Cart {
    //AGREGAR PRODUCTOS AL CARRITO
    async addProductToCart(email, product) {
        delete product._id;
        let alertUser = "";
        //Obtengo el stock real de la base de datos
        const productsStock = await instanceOfProducts.readOneProduct(product.code);
        const readData = await userModel.findOne({ email })
            .then(data => {
                //Verifico si el producto que está intentando agregar el usuario ya existe en su carrito.
                if (data.userCart.some(el => el.code == product.code)) {
                    //Si el producto ya existe verifico que no pueda agregar más de los que hay disponibles en stock.
                    if ((data.userCart[data.userCart.findIndex(el => el.code == product.code)].cant + product.cant) > productsStock.stock) {
                        alertUser = "Estás intentando agregar al carrito más productos de los que hay en el stock disponible.";
                    } else {
                        //Si el producto ya existe en el carrito del usuario agrego más cantidad a su pedido.
                        data.userCart[data.userCart.findIndex(el => el.code == product.code)].cant += product.cant;
                    }
                } else {
                    //Si el producto NO existe en el carrito de usuario pusheo un nuevo producto dentro de su carrito.
                    delete product.stock;
                    data.userCart.push(product);
                }
                return data;
            })
            .catch(e => { Error: e });
        await readData.save();
        return ({ payload: readData, message: alertUser });
    }
    //LEER UN CARRITO DESDE UN USUARIO
    async readCartFromUser(email) {
        const readData = await userModel.findOne({ email })
            .then(data => data.userCart)
            .catch(e => { Error: e });
        return readData;
    }
    //BORRAR PRODUCTOS DE UN CARRITO
    async deleteProductFromCart(email, code) {
        const userToDeleteAProduct = await userModel.findOne({ email })
            .then(user => {
                user.userCart = user.userCart.filter(element => element.code != code.code)
                return user;
            })
            .catch(e => { Error: e });
        await userToDeleteAProduct.save();
        return userToDeleteAProduct;
    }
    //VACIA EL CARRITO DEL USUARIO SELECCIONADO
    async cleanCartOfUserFromEmail(email) {
        const userToClean = await userModel.findOne({ email })
            .then(user => {
                user.userCart=[];
                return user;
            })
            .catch(e => { Error: e });
        await userToClean.save();
        return userToClean;
    }
    //TERMINAR LA COMPRA 
    async endBuy(email, userCart) {
        userCart.forEach(async element => {
            //Al finalizar la compra actualizo el stock de la base datos, restando lo que se compró.
            await instanceOfProducts.uptadteProductForBuy(element.code, element)
                .then(data => console.log(data))
                .catch(e => { Error: e });
        });
        //Vacio el carrito del usuario
        this.cleanCartOfUserFromEmail(email)
            .then(user => console.log(user))
            .catch(e => { Error: e });
        //Preparo los datos antes de enviarlos por mail 
        const products = userCart.map(product => {
            return (`
                <p>${product.description}</p>
                <p>Precio: ${product.price} U$S</p>
                <p>Cantiad de unidades: ${ product.cant}</p>
                <hr>
            `);
        })
        const total = userCart.reduce((acum, el) => acum + el.cant * el.price, 0);
        //Envio un email al usuario con el resumen de su compra.
        sendMail(email, 'Resumen de tu compra', `
        <h2>Acá te enviamos el detalle de tu compra</h2>
        <div>${products}</div>
        <h3>El total de tu compra: ${total} U$S</h3>
        `)
            .then(() => console.log('Se envió un correo al usuario para confirmarle la compra.'))
            .catch(e => console.log(e));
        return ({ email });
    }
}

export default Cart;