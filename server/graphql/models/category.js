const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')

function getMainPageCategories () {
  const api = new TopedMojitoAPI()

  return api.getCategory()
    .then(response => {
      if (!response || !response['data']) {
        return []
      }

      return {
        categories: response['data']['layout_sections'].map(section => {
          return {
            name: section['title'],
            items: section['layout_rows'].map(row => {
              const id = row['url'].split('/')

              return {
                name: row['name'],
                identifier: id[id.length - 1],
                imageURI: row['image_url'],
                url: row['url']
              }
            })
          }
        }),
        errors: []
      }
    })
    .catch(error => {
      return {
        categories: [],
        errors: [error.name, error.message]
      }
    })
}

module.exports = {
  getMainPageCategories: getMainPageCategories
}
