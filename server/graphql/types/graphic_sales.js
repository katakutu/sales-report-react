const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql')

const GraphicSalesType = new GraphQLObjectType({
  name: 'GraphicSalesType',
  fields: {
    sales: { type: new GraphQLNonNull(GraphQLInt) },
    tx: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

const GraphicSalesTypes = new GraphQLList(GraphicSalesType)

module.exports = { GraphicSalesType, GraphicSalesTypes }
