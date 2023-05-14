import productsModel from "./models/modelProducts.js";

class Products {
    //LEE TODOS LOS PRODUCTOS Y ENTREGA UNA PAGINACIÓN.
    async paginateProducts(pageNumber = 1) {
        const products = await productsModel.find()
            .then(data => {
                //-----------PAGINACIÓN DE PRODUCTOS------------------
                let aux = [];
                //Variable que controla la cantidad de productos que se van a mostrar por cada página.
                let cantArtPerPage = 28;
                //-------------------
                let pages = Math.ceil(data.length / cantArtPerPage);
                let resto = data.length % cantArtPerPage;
                if (pageNumber < pages) {
                    for (let i = ((pageNumber - 1) * cantArtPerPage); i < (pageNumber * cantArtPerPage); i++) {
                        aux.push(data[i]);
                    }
                } else if (pageNumber == pages) {
                    for (let i = ((pageNumber - 1) * cantArtPerPage); i < ((pageNumber - 1) * cantArtPerPage + resto); i++) {
                        aux.push(data[i]);
                    }
                } else {
                    console.log('Te saliste de rango');
                }
                return { products: aux, pages };
            })
            .catch(e => { Error: e });
        return products;
    }
    //LEER UN SOLO PRODUCTO
    async readOneProduct(code) {
        const products = await productsModel.findOne({ code })
            .then(data => data)
            .catch(e => { Error: e });
        return products;
    }
    //INSERTAR UN PRODUCTO
    async insertProduct(product) {
        console.log(product)
        const createData = await productsModel.create(product)
            .then(data => data)
            .catch(e => { Error: e });
        return createData;
    }
    //BORRAR UN SOLO PRODUCTO
    async deleteProductByCode(code) {
        const products = await productsModel.findOneAndDelete({ code })
            .then(data => data)
            .catch(e => { Error: e });
        return products;
    }
    //ACTUALIZAR UN PRODUCTO
    async uptadteProductByCode(code, data) {
        const products = await productsModel.updateOne({ code }, data)
            .then(data => data)
            .catch(e => { Error: e });
        return products;
    }
    //ACTUALIZAR STOCK LUEGO DE UNA COMPRA
    async uptadteProductForBuy(code, info) {
        const product = await productsModel.findOne({ code })
            .then(data => {
                data.stock -= info.cant;
                return data;
            })
            .catch(e => { Error: e });
        await product.save();
        return product;
    }
    
    //BUSCAR POR CATEGORIA DE PRODUCTOS
    async findProductByCategory(category) {
        const product = await productsModel.find({ category })
            .then(data => data)
            .catch(e => { Error: e });
        return product;
    }
    
}


export default Products;