const fetch = require('isomorphic-fetch')
const HMACToped = require('../hmac/HMACToped')

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
      let hashParams = this.generateHashParamFromObject(content)
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
        credentials: 'same-origin'
      }

      return fetch(url.toString(), options)
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
      let formData = this.generateFormDataFromObject(content)
      let apiCallDate = new Date()
      let hashParams = this.generateHashParamFromObject(content)
      let authHeader = HMACToped.generate(
        this.apiKey, 'POST', url.pathname, apiCallDate, hashParams, hashHeader
      )

      let options = {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader,
          'Content-MD5': HMACToped.generateContentHash(apiCallDate, hashParams, hashHeader),
          'X-Method': 'POST'
        },
        credentials: 'same-origin'
      }

      return fetch(url.toString(), options)
    } catch (exception) {
      if (exception instanceof TypeError) {
        return Promise.reject(`Invalid type exception: ${exception.message}`)
      }

      return Promise.reject(exception.message)
    }
  }

  /**
   * Convert an object to the application/x-www-form-urlencoded encoded string,
   * without the Percent Encoding.
   *
   * This method is created to generate the hashParams for Tokopedia's HMAC.
   *
   * @param {object} content The content object you want to convert to Hash Param
   * @returns {string} The resulting Hash Param
   *
   * @memberOf TopedHMACAPI
   */
  generateHashParamFromObject (content) {
    return Object.keys(content).map(key => {
      return `${key}=${encodeURIComponent(content[key])}`
    }).join('&')
  }

  /**
   * Create a FormData object given an Object:
   * - Object's key will be form's name.
   * - Object's value will be form's value.
   *
   * @param {object} content The object you want to convert to FormData.
   * @returns {FormData} The FormData based on content.
   *
   * @memberOf TopedHMACAPI
   */
  generateFormDataFromObject (content) {
    let form = new FormData()
    for (let k in content) {
      form.append(k, content[k])
    }

    return form
  }
}

module.exports = TopedHMACAPI
