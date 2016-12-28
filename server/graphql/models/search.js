const TopedAceAPI = require('./../../api-consumer/api/Search/TopedAceAPI')

const EMPTY_SEARCH_RESULT = [
  {
    id: 'autocomplete',
    name: 'AUTOCOMPLETE',
    items: [
      {
        keyword: 'No Result Available',
        url: '/',
        imageURI: '',
        official: false
      }
    ]
  }
]

function universalSearch (userSearchID, query) {
  let api = new TopedAceAPI()

  return api.universeSearch(query, userSearchID)
    .then(result => {
      const data = result['data'] || EMPTY_SEARCH_RESULT
      const finalResult = data.filter(r => { return r['items'].length > 0 }).map(r => {
        return {
          id: r['id'],
          name: r['name'],
          items: r['items'].map(i => {
            return {
              keyword: i['keyword'],
              url: i['url'],
              imageURI: i['imageURI'] || '',
              official: i['isOfficial'] || false
            }
          })
        }
      })

      return finalResult.concat({ id: 'recent_search', name: 'RECENT SEARCH', items: [{ keyword: 'test', url: 'test', imageURI: '', official: false }] })
    })
    .catch(error => {
      console.log(`Error getting search result: ${error.message}`)

      return EMPTY_SEARCH_RESULT
    })
}

module.exports = universalSearch
