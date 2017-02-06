// has to be used instead of babel-polyfil because of support for UC browser
import Promise from 'promise-polyfill'

// ========================================================
// Promise Polyfill
// ========================================================
if (!window.Promise) {
  window.Promise = Promise
}

// ========================================================
// Array.findIndex Polyfill
// This polyfill is needed specifically for Apollo support
// in older browser (UC, Android Old Browser).
//
// The ESLint Disable Line is also because of this.
//
// Taken from MDN
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
// ========================================================
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', { // eslint-disable-line no-extend-native
    value: function (predicate) {
      'use strict'
      if (this == null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined')
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var list = Object(this)
      var length = list.length >>> 0
      var thisArg = arguments[1]
      var value

      for (var i = 0; i < length; i++) {
        value = list[i]
        if (predicate.call(thisArg, value, i, list)) {
          return i
        }
      }
      return -1
    },
    enumerable: false,
    configurable: false,
    writable: false
  })
}

// Array.includes Polyfill
// This polyfill is needed specifically for hotlist support
// in older browser (UC, Android Old Browser).
//
// The ESLint Disable Line is also because of this.
//
// Taken from MDN
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill
// ========================================================
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement /*, fromIndex */) { // eslint-disable-line no-extend-native
    'use strict'
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined')
    }

    var O = Object(this)
    var len = parseInt(O.length, 10) || 0
    if (len === 0) {
      return false
    }
    var n = parseInt(arguments[1], 10) || 0
    var k
    if (n >= 0) {
      k = n
    } else {
      k = len + n
      if (k < 0) { k = 0 }
    }
    var currentElement
    while (k < len) {
      currentElement = O[k]
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // eslint-disable-line
        return true
      }
      k++
    }
    return false
  }
}
