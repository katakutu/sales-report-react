const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType

const Queries = require('./queries')

const config = require('../../config')

// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => (Queries)
  })
})

module.exports = graphqlHTTP({
  schema: schema,
  graphiql: !config.globals.__PROD__
})
