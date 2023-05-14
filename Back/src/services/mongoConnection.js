import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
/*
    mode='production';
    dotenv.config({
        path: mode==='production' : './.env.production' ? './.env.development'
    })
*/
const mongoConnect = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.URLMONGODBCONNECT)
        .then(() => console.log('Conectado a la base de datos.'))
        .catch(e => console.log(e));
}
export default mongoConnect;