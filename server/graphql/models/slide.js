const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')

function getSlides () {
  const api = new TopedMojitoAPI()

  return api.getSlides(25, 2, 65535, 1, 0).then(response => {
    const responseMeta = response['meta']
    const resultMeta = (Object.keys(responseMeta).length > 0 && responseMeta.constructor === Object)
      ? responseMeta
      : { total_data: response['data']['slides'].length }

    return { meta: resultMeta, slides: response['data']['slides'] }
  })
}

module.exports = getSlides
