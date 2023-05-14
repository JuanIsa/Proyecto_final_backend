import User from '../dao/handlerUsersDAO.js';
import {strict as assert} from 'assert';
import mongoConnect from '../services/mongoConnection.js';

mongoConnect();
const instanceOfUser = new User(); 

describe('Test generales del DAO de usuarios.',()=>{
    describe("Prueba sobre la consulta a la base de datos.",()=>{
        before(async function(){
            //Aca por ejemplo podés borrar una base de datos
        });
        it('Al consultar un usuario el DAO debe devolver el _id del mismo.', async function(){
            const datos= await instanceOfUser.readUser("admin");
            assert.ok(datos._id);
            //Array.isArray(); Verifica si eso es un array
            //assert.strictEqual("condicion o dato a verificar",true);
        });
    });

});