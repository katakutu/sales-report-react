/*
* Imports from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
* :: cookies.js ::
*
* A complete cookies reader/writer framework with full unicode support.
*
* Revision #1 - September 4, 2014
*
* https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
* https://developer.mozilla.org/User:fusionchess
* https://github.com/madmurphy/cookies.js
*
* This framework is released under the GNU Public License, version 3 or later.
* http://www.gnu.org/licenses/gpl-3.0-standalone.html
*
* Syntaxes:
*
* * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
* * docCookies.getItem(name)
* * docCookies.removeItem(name[, path[, domain]])
* * docCookies.hasItem(name)
* * docCookies.keys()
*
*/

const Cookies = {
  getItem: function (sKey) {
    if (!sKey) { return null }
    const regexKeyPart = encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&')
    const fullRegex = new RegExp('(?:(?:^|.*;)\\s*' + regexKeyPart + '\\s*\\=\\s*([^;]*).*$)|^.*$')

    return decodeURIComponent(document.cookie.replace(fullRegex, '$1')) || null
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) { return false }
    var sExpires = ''
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
          break
        case String:
          sExpires = '; expires=' + vEnd
          break
        case Date:
          sExpires = '; expires=' + vEnd.toUTCString()
          break
      }
    }

    const sDomainPart = sDomain ? '; domain=' + sDomain : ''
    const sPathPart = sPath ? '; path=' + sPath : ''
    const bSecurePart = bSecure ? '; secure' : ''
    document.cookie = encodeURIComponent(sKey) +
'=' +
encodeURIComponent(sValue) +
sExpires + sDomainPart + sPathPart + bSecurePart

    return true
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false }
    const sPathPart = sPath ? '; path=' + sPath : ''
    const sDomainPart = sDomain ? '; domain=' + sDomain : ''
    const expiresPart = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = encodeURIComponent(sKey) + expiresPart + sDomainPart + sPathPart
    return true
  },
  hasItem: function (sKey) {
    if (!sKey) { return false }

    const regex = new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')
    return regex.test(document.cookie)
  },
  keys: function () {
    const replaceRegex = /((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g
    const splitRegex = /\s*(?:=[^;]*)?;\s*/
    var aKeys = document.cookie.replace(replaceRegex, '').split(splitRegex)
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]) }
    return aKeys
  }
}

export default Cookies
