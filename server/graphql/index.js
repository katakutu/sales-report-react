const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema;
const queries = require('./queries')



const tickerQueries = require('./queries/ticker');



// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
  query: queries,
})

module.exports = graphqlHTTP({
  schema: schema,
  graphiql: true
})
