const HMACToped = require('../hmac/HMACToped')
const request = require('request-promise')
const querystring = require('querystring')

/**
 * A base class to consume http API with HMAC.
 * Supposed to be composed with other class that will do the real hard work.
 *
 * @class TopedHMACAPI
 */
class TopedHMACAPI {
  /**
   * Creates an instance of TopedHMACAPI.
   *
   * @param {string} apiKey the API secret key for HMAC
   *
   * @memberOf TopedHMACAPI
   */
  constructor (apiKey) {
    this.apiKey = apiKey
  }

  /**
   * Consume an API by form or JSON, depends on what we give as type.
   *
   * @param {string} type Type of the call. Can be either FORM or JSON. Defaults to JSON.
   * @param {URL} url The URL we want to consume
   * @param {string} method The HTTP Method we want to use on the API call. The FORM type assumes POST.
   * @param {object} content The content we want to sent in body.
   * @param {string} [hashHeader='~b'] The header in user_id~device_id format.
   * @returns {Promise<Response>} The resulting response promise.
   *
   * @memberOf TopedHMACAPI
   */
  consume (type, url, method, content, hashHeader = '~b') {
    let result
    switch (type) {
      case 'FORM':
        result = this.consumeForm(url, content, hashHeader)
        break

      case 'JSON':
        result = this.consumeJSON(url, method, content, hashHeader)
        break

      default:
        result = this.consumeJSON(url, method, content, hashHeader)
    }

    return result
  }

  /**
   * Consume an API endpoint by sending JSON to the server.
   *
   * @param {URL} url The URL we want to consume
   * @param {string} method The HTTP Method we want to use on the API call.
   * @param {object} content The content we want to sent in body.
   * @param {string} [hashHeader='~b'] The header in user_id~device_id format.
   * @returns {Promise<Response>} The resulting response promise.
   *
   * @memberOf TopedHMACAPI
   */
  consumeJSON (url, method, content, hashHeader = '~b') {
    try {
      let contentString = JSON.stringify(content)
      let apiCallDate = new Date()
      let hashParams = querystring.stringify(content)
      let authHeader = HMACToped.generate(
        this.apiKey, method, url.pathname, apiCallDate, hashParams, hashHeader
      )

      let options = {
        method: method,
        body: contentString,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
          'Content-MD5': HMACToped.generateContentHash(apiCallDate, hashParams, hashHeader),
          'X-Method': method
        },
        timeout: 5000
      }

      return request(url, options).then(response => JSON.parse(response))
    } catch (exception) {
      if (exception instanceof TypeError) {
        return Promise.reject(`Invalid type exception: ${exception.message}`)
      }

      return Promise.reject(exception.message)
    }
  }

  /**
   * Consume an API endpoint by sending FormData with application/x-www-form-urlencoded
   * and POST HTTP Method.
   *
   * @param {URL} url The URL we want to consume
   * @param {object} content The content we want to sent in body. This will be converted to FormData.
   * @param {string} [hashHeader='~b'] The header in user_id~device_id format.
   * @returns {Promise<Response>} The resulting response promise.
   *
   * @memberOf TopedHMACAPI
   */
  consumeForm (url, content, hashHeader = '~b') {
    try {
      let formData = querystring.stringify(content)
      let apiCallDate = new Date()
      let hashParams = querystring.stringify(content)
      let authHeader = HMACToped.generate(
        this.apiKey, 'POST', url.pathname, apiCallDate, hashParams, hashHeader
      )

      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader,
          'Content-MD5': HMACToped.generateContentHash(apiCallDate, hashParams, hashHeader),
          'X-Method': 'POST'
        },
        body: formData,
        timeout: 5000
      }

      return request(url, options).then(response => JSON.parse(response))
    } catch (exception) {
      if (exception instanceof TypeError) {
        return Promise.reject(`Invalid type exception: ${exception.message}`)
      }

      return Promise.reject(exception.message)
    }
  }
}

module.exports = TopedHMACAPI
