const SlidesType = require('../../types/slides')
const getSlides = require('../../models/slide')

const SlideQuery = {
  type: SlidesType,
  args: { },
  resolve: function (_, args) {
    return getSlides()
  }
}

module.exports = SlideQuery
