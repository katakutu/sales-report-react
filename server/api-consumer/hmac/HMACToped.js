const dateFormat = require('dateformat')
const CryptoJS = require('crypto-js')

/**
 * A static class to get HMAC Signature for API calls.
 * Created mostly for the API module.
 *
 * @class HMACToped
 */
class HMACToped {
    /**
     * Returns HMAC Signature based on the parameteres given.
     * This is a partial function (as opossed to *pure* function) mainly because it
     * throws.
     *
     * @static
     * @param {string} key - Secret key used by the API.
     * @param {string} method - HTTP Method used used by the API. Valid values are 'GET' and 'POST'.
     * @param {string} path - The API path.
     * @param {Date} date - The current time for the function call.
     * @param {string} hashParam - Hash parameter for the API. Usually user_id~device_id.
     * @param {string} hashHeader - The HTTP Header for the API. Exclude hash and device_time here.
     * @returns {string} HMAC signature needed for API call.
     *
     * @throws {TypeError} When method is not GET or POST and when date is not a Date object.
     *
     * @memberOf HMACToped
     */
  static generate (key, method, path, date, hashParam, hashHeader) {
    if (method !== 'GET' && method !== 'POST') {
      throw new TypeError(`Expected GET or POST for the method parameter. Got ${method}.`)
    }

    if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN(date.getTime())) {
      let t = Object.prototype.toString.call(date)
      throw new TypeError(`Expected date to be a Date Object. Got ${t} instead.`)
    }

    let contentMD5 = HMACToped.generateContentHash(date, hashParam, hashHeader)
    let time = dateFormat(date, 'ddd, DD MMM YYYY HH:mm:ss ZZ')
    let formType = (method === 'POST') ? 'application/x-www-form-urlencoded' : ''

    let data = `${method}\n${contentMD5}\n${formType}\n${time}\n${path}`

    let hmac = CryptoJS.HmacSHA1(data, key).toString(CryptoJS.enc.Base64)

    return `TKPD Tokopedia: ${hmac}`
  }

    /**
     * Returns HMAC Signature for http://points.tokopedia.com API based on the parameteres given.
     * This is a partial function (as opossed to *pure* function) mainly because it
     * throws.
     *
     * @static
     * @param {string} key - Secret key used by the API.
     * @param {string} method - HTTP Method used used by the API. Valid values are 'GET' and 'POST'.
     * @param {string} path - The API path.
     * @param {Date} date - The current time for the function call.
     * @param {string} hashParam - Hash parameter for the API. Usually user_id~device_id.
     * @param {string} hashHeader - The HTTP Header for the API. Exclude hash and device_time here.
     * @param {string} uid - Tokopedia's User ID.
     * @returns {string} HMAC signature needed for API call.
     *
     * @throws {TypeError} When method is not GET or POST and when date is not a Date object.
     *
     * @memberOf HMACToped
     */
  static generateForPoints (key, method, path, date, hashParam, hashHeader, uid) {
    if (method !== 'GET' && method !== 'POST') {
      throw new TypeError(`Expected GET or POST for the method parameter. Got ${method}.`)
    }

    if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN(date.getTime())) {
      let t = Object.prototype.toString.call(date)
      throw new TypeError(`Expected date to be a Date Object. Got ${t} instead.`)
    }

    let contentMD5 = '' // for points there's no ContentMD5
    let time = Math.floor(date.getTime() / 1000)
    let formType = (method === 'POST') ? 'application/x-www-form-urlencoded' : ''

    let data = `${method}\n${contentMD5}\n${formType}\n${time}\n${uid}${path}`

    let hmac = CryptoJS.HmacSHA1(data, key).toString(CryptoJS.enc.Base64)

    return hmac
  }

  /**
   * Generates the MD5 hash of parameters.
   *
   * @static
   * @param {Date} date - The current time for the function call.
   * @param {string} hashParam - Hash parameter for the API. Usually user_id~device_id.
   * @param {string} hashHeader - The HTTP Header for the API. Exclude hash and device_time here.
   * @returns {string} the MD5 hash of content
   *
   * @throws {TypeError} When date is not a Date object.
   *
   * @memberOf HMACToped
   */
  static generateContentHash (date, hashParam, hashHeader) {
    if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN(date.getTime())) {
      let t = Object.prototype.toString.call(date)
      throw new TypeError(`Expected date to be a Date Object. Got ${t} instead.`)
    }

    let deviceTime = Math.floor(date.getTime() / 1000)
    let hash = CryptoJS.MD5(hashParam)
    let finalHashParam = `${hashHeader}&hash=${hash}&device_time=${deviceTime}`

    return CryptoJS.MD5(finalHashParam).toString()
  }
}

module.exports = HMACToped
