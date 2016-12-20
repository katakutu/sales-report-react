const TopedAceAPI = require('./../../api-consumer/api/Search/TopedAceAPI')

const EMPTY_SEARCH_RESULT = [
  {
    id: 'autocomplete',
    name: 'AUTOCOMPLETE',
    items: [{ keyword: 'No Result Available', url: '/' }]
  }
]

function universalSearch (userSearchID, query) {
  let api = new TopedAceAPI()

  return api.universeSearch(query, userSearchID).then(result => {
    const data = result['data'] || EMPTY_SEARCH_RESULT
    return data.filter(r => { return r['items'].length > 0 })
  })
}

module.exports = universalSearch
