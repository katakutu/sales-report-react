const TopedAceAPI = require('./../../api-consumer/api/Search/TopedAceAPI')

function universalSearch (userSearchID, query) {
  let api = new TopedAceAPI()

  return api.universeSearch(query, userSearchID).then(result => {
    return result['data'].filter(r => { return r['items'].length > 0 })
                             .filter(s => s['name'].toLowerCase() !== 'autocomplete')
  })
}

module.exports = universalSearch
