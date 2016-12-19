const { CategoryType } = require('../../types/category')
const { getMainPageCategories } = require('../../models/category')

const { GraphQLList } = require('graphql')

const CategoryQuery = {
  type: new GraphQLList(CategoryType),
  args: { },
  resolve: function (_, args) {
    return getMainPageCategories()
  }
}

module.exports = CategoryQuery
