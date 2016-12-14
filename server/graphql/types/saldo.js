const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const SaldoType = new GraphQLObjectType({
  name: 'Saldo',
  fields: {
    deposit_fmt: { type: new GraphQLNonNull(GraphQLString) }
  }
})

module.exports = SaldoType
