const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const Shop = new GraphQLObjectType({
  name: 'Shop',
  fields: {    
    domain: { type: GraphQLString },
    gold_shop: { type: GraphQLString },
    id: { type: GraphQLString },
    is_owner: { type: GraphQLString },
    location: { type: GraphQLString },
    lucky_shop: { type: GraphQLString },
    nameowner_id: { type: GraphQLString },
    uri: { type: GraphQLString },
  }
})

module.exports = Shop
