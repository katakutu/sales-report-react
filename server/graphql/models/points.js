const {
    TopedPointsAPI,
    DEFAULT_POINTS_DATA
} = require('./../../api-consumer/api/Points/TopedPointsAPI')
const common = require('./common')

function getPoints (context) {
  const userID = common.getUserID(context)

  return userID
        .then(uid => {
          if (uid === 0) {
            return Promise.resolve(DEFAULT_POINTS_DATA)
          }

          const api = new TopedPointsAPI()

          return api.getPoints(uid)
        })
        .catch(error => {
          console.error(`[GraphQL][Models][Points] Error getting points data: ${error}`)

          return Promise.resolve(DEFAULT_POINTS_DATA)
        })
}

module.exports = getPoints
