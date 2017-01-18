const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const Products = new GraphQLObjectType({
  name: 'Products',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    img_url: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const Imgshop = new GraphQLObjectType({
  name: 'img_shop',
  fields: {
    cover: { type: new GraphQLNonNull(GraphQLString) },
    s_url: { type: new GraphQLNonNull(GraphQLString) },
    xs_url: { type: new GraphQLNonNull(GraphQLString) },
    cover_ecs: { type: new GraphQLNonNull(GraphQLString) },
    s_ecs: { type: new GraphQLNonNull(GraphQLString) },
    xs_ecs: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const Favorite = new GraphQLObjectType({
  name: 'Favorite',
  fields: {
    shop_id: { type: new GraphQLNonNull(GraphQLString) },
    shop_url: { type: new GraphQLNonNull(GraphQLString) },
    shop_url2: { type: new GraphQLNonNull(GraphQLString) },
    domain: { type: new GraphQLNonNull(GraphQLString) },
    shop_name: { type: new GraphQLNonNull(GraphQLString) },
    is_gold: { type: new GraphQLNonNull(GraphQLString) },
    is_official: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    img_shop: { type: new GraphQLNonNull(Imgshop) },
    products: { type: new GraphQLList(Products) }
  }
})
const Favorites = new GraphQLList(Favorite)

module.exports = { Favorites, Favorite, Imgshop, Products }
