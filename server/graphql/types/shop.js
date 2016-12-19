const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

const Shop = new GraphQLObjectType({
  name: 'Shop',
  fields: {    
    shop_id: { type: GraphQLString },
    shop_url: { type: GraphQLString },
    domain: { type: GraphQLString },
    shop_name: { type: GraphQLString },
    shop_name_unfmt: { type: GraphQLString },
    shop_name_clean: { type: GraphQLString },
    is_gold: { type: GraphQLString },
    is_official: { type: GraphQLString },
    location: { type: GraphQLString },
    logo: { type: GraphQLString },
    shop_badge: { type: GraphQLString }
  }
})

module.exports = Shop
