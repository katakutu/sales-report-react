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
const WalletType = require('./wallet')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    isLoggedIn: { type: new GraphQLNonNull(GraphQLBoolean) },
    shouldRedirect: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    deposit: { type: SaldoType },
    points: { type: PointsType },
    notifications: { type: NotificationType },
    shop: { type: ShopType },
    wallet: { type: WalletType }
  }
})

module.exports = UserType
