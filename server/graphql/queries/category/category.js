const { CategoriesType } = require('../../types/category')
const { getMainPageCategories } = require('../../models/category')

const CategoryQuery = {
  type: CategoriesType,
  args: { },
  resolve: function (_, args) {
    return getMainPageCategories()
  }
}

module.exports = CategoryQuery
