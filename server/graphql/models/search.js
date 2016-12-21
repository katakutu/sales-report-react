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
    const finalResult = data.filter(r => { return r['items'].length > 0 }).map(r => {
      return {
        id: r['id'],
        name: r['name'],
        items: r['items'].map(i => {
          return {
            keyword: i['keyword'],
            url: i['url'],
            imageURI: i['imageURI'] || ''
          }
        })
      }
    })

    return finalResult
  })
}

module.exports = universalSearch
