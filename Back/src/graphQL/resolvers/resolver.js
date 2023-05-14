import Users from "../../dao/handlerUsersDAO.js";

export const resolvers = {
    Query: {
        helloWorld: () => {
            return "Hola mundo";
        },
        getVideoGames:async()=> {
            const instanceUser= new Users();
            const data= await instanceUser.readUser('admin');
            return data;
        }
    },
    Mutation:{
        prueba:()=>{
            return "Probando mutaciones";
        }
    }
};