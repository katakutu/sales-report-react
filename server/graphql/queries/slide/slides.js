const SlidesType = require('../../types/slides')
const getSlides = require('../../models/slide')

const SlideQuery = {
  type: SlidesType,
  args: { },
  resolve: function (_, args, context) {
    return getSlides(context)
  }
}

module.exports = SlideQuery
