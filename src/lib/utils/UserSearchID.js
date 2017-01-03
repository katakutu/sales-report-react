import CryptoJS from 'crypto-js'

class UserSearchID {
  static generateUserIDMD5 (userID) {
    const hash = CryptoJS.MD5(userID)

    return hash.toString()
  }

  /* cookie handler */
  static _getCookie (cname) {
    const name = cname + '='
    const ca = document.cookie.split(';')
    const caLen = ca.length
    for (let i = 0; i < caLen; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  /* get unique id from cookie */
  static getUniqueID (currentID) {
    const userID = currentID
    const ucn = UserSearchID._getUniqueIDCookieName()
    const uniqueID = userID && userID !== '-' ? userID : UserSearchID._getCookie(ucn)

    return uniqueID
  }

  static initUniqueID () {
    /* if _ID_autocomplete_ not found, create new */
    const cookieName = UserSearchID._getUniqueIDCookieName()
    if (document.cookie.indexOf(cookieName) < 0) {
      UserSearchID._createUniqueID(UserSearchID._genUniqueID())
    } else {
      /* update */
      UserSearchID._createUniqueID(UserSearchID._getCookie(UserSearchID._getUniqueIDCookieName()))
    }
  }

  /* create cookie containing unique id */
  static _createUniqueID (value) {
    let domain = location.hostname
    const cookieName = UserSearchID._getUniqueIDCookieName()
    if (window.location.href.indexOf('ndvl') > -1) {
      domain = /(\..*\.ndvl)/.exec(location.hostname)[1]
    } else if (window.location.href.indexOf('localhost') > -1) {
      domain = /(localhost)/.exec(location.hostname)[1]
    } else if (window.location.href.indexOf('ndvl') < 0) {
      domain = /(\..*\.com)/.exec(location.hostname) &&
               /(\..*\.com)/.exec(location.hostname)[1] ||
               location.hostname
    }

    document.cookie = cookieName + '=' + value + ';max-age=604800;domain=' + domain + ';path=/;'
  }

  /* get cookie name */
  static _getUniqueIDCookieName () {
    let cookieName = '_ID_autocomplete_'
    if (window.location.href.indexOf('staging') > -1) {
      cookieName = '_ID_autocomplete_Staging'
    } else if (window.location.href.indexOf('alpha') > -1) {
      cookieName = '_ID_autocomplete_Alpha'
    }
    return cookieName
  }

  /*
  * Psuedo unique id generator
  * from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/21963136#21963136
  * basically it is produce uuid without dash (-)
  */
  static _genUniqueID () {
    let u = ''
    let m = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
    let i = 0
    let rb = Math.random() * 0x100000000 >>> 0
    while (i++ < 32) {
      let c = m[i - 1]
      let r = rb & 0xf
      let v = c === 'x' ? r : (r & 0x3 | 0x8)

      u += (c === '-' || c === '4') ? c : v.toString(16)
      rb = i % 8 === 0 ? Math.random() * 0x100000000 >>> 0 : rb >> 4
    }
    return u
  }
}

export default UserSearchID
