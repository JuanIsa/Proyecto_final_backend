export const typeDefs = `#graphql
    type user{
        _id:ID
        password: String
        completeName: String
        address: String
        age: Int
        telphoneNumber: String
    }

    type Query {
        helloWorld: String
        getVideoGames: user
    }

    type Mutation{
        prueba: String
    }
`;