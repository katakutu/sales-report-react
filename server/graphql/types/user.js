const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const SaldoType = require('./saldo')
const PointsType = require('./points')
const NotificationType = require('./notification')
const ShopType = require('./shop')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    isLoggedIn: { type: new GraphQLNonNull(GraphQLBoolean) },
    shouldRedirect: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    deposit: { type: SaldoType },
    points: { type: PointsType },
    notifications: { type: NotificationType },
    shop: { type: ShopType }
  }
})

module.exports = UserType
