const TopedAceAPI = require('./../../api-consumer/api/Search/TopedAceAPI')
const TopedUserRecommendationAPI = require('./../../api-consumer/api/UserRecommendation/TopedUserRecommendation')
const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')
const favorite = require('./favorite')

const EMPTY_FEED = {
  has_next_page: false,
  total_data: 0,
  items: []
}

const EMPTY_RECENT_VIEW = {
  total_data: 0,
  items: []
}

const EMPTY_RECOMMENDATION = {
  size_data: 0,
  source: '',
  items: []
}

function getFeeds (ob, rows, start, userID, uniquedId) {
  const api = new TopedAceAPI()
  const shopsID = favorite.getShopID(userID)
  return shopsID
        .then(uid => {
          let shopID = ''
          uid.map((shop, li) => {
            if (shopID === '') {
              shopID += shop.shop_id
            } else {
              shopID += `,${shop.shop_id}`
            }
          })

          return api.getFeed(ob, rows, start, shopID, uniquedId).then(response => {
            if (!response['data']) {
              const raw = JSON.stringify(response)
              console.error(`[Ace][Feed][GetFeed] Feed API calls returns no usual data. Raw data: ${raw}`)

              return EMPTY_FEED
            }
            let nextpage = (response['header']['total_data'] > (rows * (start + 1)))
            return {
              has_next_page: nextpage,
              total_data: response['header']['total_data'],
              items: response['data']['products']
            }
          })
          .catch(err => {
            console.error(`[Ace][Feed][GetFeed] Feed API call faield. Cause: ${err.message}`)

            return EMPTY_FEED
          })
        })
        .catch(error => {
          console.error(`[Ace][Feed][GetFeed] Feed API call faield. Cause:  ${error}`)

          return Promise.resolve(EMPTY_FEED)
        })
}

function getRecommendations (userID, recommendationSource, recommendationSize) {
  const api = new TopedUserRecommendationAPI()

  return api.getRecommendation(userID, recommendationSource, recommendationSize).then(response => {
    if (!response['data']) {
      const raw = JSON.stringify(response)
      console.error(`[Merlin][Recommendation][GetRecommendation]
        Recommendation API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_RECOMMENDATION
    }

    return {
      size_data: response['meta']['size'],
      source: response['data'][0]['source'],
      items: response['data'][0]['recommendation']
    }
  })
  .catch(err => {
    console.error(`[Merlin][Recommendation][GetRecommendation]
      Recommendation API call faield. Cause: ${err.message}`)

    return EMPTY_RECOMMENDATION
  })
}

function getRecentViews (userID) {
  const api = new TopedMojitoAPI()

  return api.getRecentView(userID).then(response => {
    if (!response['data']) {
      const raw = JSON.stringify(response)
      console.error(`[Mojito][RecentView][GetRecentView]
        RecentView API calls returns no usual data. Raw data: ${raw}`)

      return EMPTY_RECENT_VIEW
    }

    return {
      total_data: response['header']['total_data'],
      items: response['data']['list']
    }
  })
  .catch(err => {
    console.error(`[Mojito][RecentView][GetRecentView]
      RecentView API call faield. Cause: ${err.message}`)

    return EMPTY_RECENT_VIEW
  })
}

module.exports = {
  getFeeds,
  getRecommendations,
  getRecentViews
}
