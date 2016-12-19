const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const CategoryItemType = new GraphQLObjectType({
  name: 'CategoryItem',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    identifier: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    items: { type: new GraphQLList(CategoryItemType) }
  }
})

module.exports = { CategoryType, CategoryItemType }
