const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql')

const TableSalesType = new GraphQLObjectType({
  name: 'TableSalesType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    registration_number: { type: new GraphQLNonNull(GraphQLInt) },
    registration_rate: { type: new GraphQLNonNull(GraphQLInt) },
    subscription_number: { type: new GraphQLNonNull(GraphQLInt) },
    subscription_rate: { type: new GraphQLNonNull(GraphQLInt) },
    revenue_number: { type: new GraphQLNonNull(GraphQLInt) },
    revenue_rate: { type: new GraphQLNonNull(GraphQLInt) },
    arpu_number: { type: new GraphQLNonNull(GraphQLInt) },
    arpu_rate: { type: new GraphQLNonNull(GraphQLInt) },
    arppu_number: { type: new GraphQLNonNull(GraphQLInt) },
    arppu_rate: { type: new GraphQLNonNull(GraphQLInt) }
  }
})

const TableSalesTypes = new GraphQLList(TableSalesType)

module.exports = { TableSalesType, TableSalesTypes }
