const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType

const tickerQueries = require('./queries/ticker')

// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => (tickerQueries)
  })
})

module.exports = graphqlHTTP({
  schema: schema,
  graphiql: true
})
