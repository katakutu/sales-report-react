const {
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const ErrorType = require('./error')

const WalletType = new GraphQLObjectType({
  name: 'Wallet',
  fields: {
    linked: { type: new GraphQLNonNull(GraphQLBoolean) },
    balance: { type: new GraphQLNonNull(GraphQLString) },
    errors: { type: new GraphQLList(ErrorType) }
  }
})

module.exports = WalletType
