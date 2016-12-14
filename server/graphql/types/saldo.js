import {
    GraphQLObjectType,
    GraphQlNonNull,
    GraphQLString,
    GraphQLID
} from 'graphql';

const saldoType = new GraphQLObjectType( {
    name: 'Saldo',
})