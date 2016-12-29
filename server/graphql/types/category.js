const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql')

const ErrorType = require('./error')

const CategoryItemType = new GraphQLObjectType({
  name: 'CategoryItem',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    identifier: { type: new GraphQLNonNull(GraphQLString) },
    imageURI: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    items: { type: new GraphQLList(CategoryItemType) }
  }
})

const CategoriesType = new GraphQLObjectType({
  name: 'Categories',
  fields: {
    categories: { type: new GraphQLList(CategoryType) },
    errors: { type: new GraphQLList(ErrorType) }
  }
})

module.exports = { CategoriesType, CategoryType, CategoryItemType }
