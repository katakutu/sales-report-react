const request = require('request-promise')
const querystring = require('querystring')

/* const obcache = require('obcache')
const redis = require('../../GlobalConfig').SessionRedis

const topedAPICache = obcache.debug.register(new obcache.Create({
  max: 10000,
  maxAge: 30 * 60 * 1000,
  redis: redis,
  id: 2
}), 'topedapi')

const wrappedTopedFetch = topedAPICache.wrap((url, options, cb) => {
  request(url, options)
  .then(response => {
    cb(null, response)
  })
  .catch(err => {
    cb(err)
  })
}) */

/**
 * A base class to consume http API without HMAC.
 * Supposed to be composed with other class that will do the real hard work.
 *
 * @class TopedAPI
 */
class TopedAPI {
  /**
   * Consume an API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL.
   * Default timeout for API is 5s, this could be modified via options.
   *
   * @param {URL} url The URL we want to consume
   * @param {string} method The HTTP Method we want to use on the API call.
   * @param {object} content The content we want to sent in body.
   * @param {object} options Additional options for request. Defaults to empty object
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf TopedAPI
   */
  consume (url, method, content, options = {}) {
    let additionalOptions = (method === 'GET') ? {} : {
      method: method,
      body: JSON.stringify(content)
    }

    let finalURL = (method === 'POST') ? url.format()
            : this._formatGetURL(url, content)

    let finalOptions = Object.assign({
      timeout: 5000
    }, additionalOptions, options)

    return request(finalURL, finalOptions).then(response => this._processJSON(response))

    /* return new Promise((resolve, reject) => {
      wrappedTopedFetch(finalURL, finalOptions, (err, response) => {
        if (err) return reject(err)
        resolve(this._processJSON(response))
      })
    }) */
  }

  consumeForm (url, method, content, options = {}) {
    try {
      let formData = querystring.stringify(content)

      let options = {
        method: method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData,
        timeout: 5000,
        resolveWithFullResponse: true
      }
      return request(url, options)
    } catch (exception) {
      if (exception instanceof TypeError) {
        return Promise.reject(`Invalid type exception: ${exception.message}`)
      }

      return Promise.reject(exception.message)
    }
  }

  /**
   * Consume an OAuth API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {string} method The HTTP Method we want to use on the API call.
   * @param {string} token The OAuth Token.
   * @param {string} tokenType The OAuth Token Type.
   * @param {object} content The content we want to sent in body.
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf TopedAPI
   */
  consumeOAuth (url, method, token, tokenType, content) {
    let options = (method === 'GET') ? {} : {
      body: JSON.stringify(content),
      json: true
    }

    let finalOptions = Object.assign({}, options, {
      method: method,
      headers: {
        'Authorization': `${tokenType} ${token}`
      },
      timeout: 5000
    })

    let finalURL = (method === 'POST') ? url.format()
            : this._formatGetURL(url, content)

    return request(finalURL, finalOptions).then(response => {
      return this._processJSON(response)
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
    if (content === undefined || content === null) return ''

    return Object.keys(content).map(key => {
      return key + '=' + encodeURIComponent(content[key])
    }).join('&')
  }

  _formatGetURL (url, content) {
    let result = url.format()
    if (Object.keys(content).length > 0) {
      result = result + '?' + this.contentToURIParams(content)
    }

    return result
  }

  _processJSON (jsonString) {
    let result = {}
    try {
      result = JSON.parse(jsonString)
    } catch (e) {
      console.error(`[TopedAPI] Error parsing ${jsonString} to JSON. Message: ${e.getMessage}`)
      result = {}
    }

    return result
  }

  /**
   * Consume an API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {object} content The content we want to sent in body.
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf
   */
  consumeGet (url, content) {
    return this.consume(url, 'GET', content)
  }

  /**
   * Consume an API with specific URL and method.
   * If the method is GET, content will be sent via serialized URL
   *
   * @param {URL} url The URL we want to consume
   * @param {object} content The content we want to sent in body.
   * @returns {Promise<Object>} The resulting response promise, in JSON.
   *
   * @memberOf
   */
  consumePost (url, content) {
    return this.consume(url, 'POST', content)
  }
}

module.exports = TopedAPI
