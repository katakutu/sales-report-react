import fetch from 'isomorphic-fetch'

/**
 * A base class to consume http API without HMAC.
 * Supposed to be composed with other class that will do the real hard work.
 *
 * @class TopedAPI
 */
class TopedAPI {
  /**
   * Consume an API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {string} method The HTTP Method we want to use on the API call.
   * @param {object} content The content we want to sent in body.
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf TopedAPI
   */
  consume (url, method, content) {
    let options = (method === 'GET') ? {} : {
      method: method,
      body: JSON.stringify(content)
    }

    let finalURL = (method === 'POST') ? url.toString()
            : url.toString() + '?' + this.contentToURIParams(content)

    return fetch(finalURL, options).then(response => {
      return response.json()
    })
  }

  /**
   * Convert an object into URL params
   *
   * @param {object} content The object we want to convert
   * @returns {string} The URL parameters, with associated encoding.
   *
   * @memberOf TopedAPI
   */
  contentToURIParams (content) {
    return Object.keys(content).map(key => {
      return key + '=' + encodeURIComponent(content[key])
    }).join('&')
  }
}

export default TopedAPI
