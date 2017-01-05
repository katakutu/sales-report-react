const TopedAceAPI = require('./../../api-consumer/api/Search/TopedAceAPI')

const EMPTY_TOP_PICKS = []

function getTopPicks () {
  const api = new TopedAceAPI()

  return api.topPicks().then(response => {
    if (!response['data'] || !response['data']['toppicks']) {
      const raw = JSON.stringify(response)
      console.error(`[Ace][TopPicks] Top picks API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_TOP_PICKS
    }

    return response['data']['toppicks']
  })
  .catch(err => {
    console.error(`[Ace][TopPicks] Top Picks API call faield. Cause: ${err.message}`)

    return EMPTY_TOP_PICKS
  })
}

module.exports = getTopPicks
