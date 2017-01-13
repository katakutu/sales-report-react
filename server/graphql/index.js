const gse = require('graphql-server-express')
const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType

const Queries = require('./queries')

// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => (Queries)
  })
})

module.exports = gse.graphqlExpress((req) => ({
  schema: schema,
  context: req
}))
