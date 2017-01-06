const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')
const common = require('./common')

const EMPTY_SLIDES = {
  meta: { total_data: 0 },
  slides: []
}

function getSlides (context) {
  const userID = common.getUserID(context)
  const api = new TopedMojitoAPI()

  return userID.then(uid => {
    return api.getSlides(25, 2, 65535, 1, 0, uid)
      .then(response => {
        if (!response['data']) {
          return EMPTY_SLIDES
        }

        const responseMeta = response['meta']
        const resultMeta = (Object.keys(responseMeta).length > 0 && responseMeta.constructor === Object)
          ? responseMeta
          : { total_data: response['data']['slides'].length }

        return { meta: resultMeta, slides: response['data']['slides'] }
      })
      .catch(error => {
        console.log(`Error getting slides: ${error.message}`)

        return { EMPTY_SLIDES }
      })
  })
}

module.exports = getSlides
