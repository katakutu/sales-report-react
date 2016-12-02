const CryptoJS = require('crypto-js')

function generateContentHash (date, hashParam, hashHeader) {
  if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN(date.getTime())) {
    let t = Object.prototype.toString.call(date)
    throw new TypeError(`Expected date to be a Date Object. Got ${t} instead.`)
  }

  let deviceTime = Math.floor(date.getTime() / 1000)
  let hash = CryptoJS.MD5(hashParam)
  let finalHashParam = `${hashHeader}&hash=${hash}&device_time=${deviceTime}`

  return CryptoJS.MD5(finalHashParam).toString()
}

function generate (key, method, path, date, hashParam, hashHeader, uid) {
  if (method !== 'GET' && method !== 'POST') {
    throw new TypeError(`Expected GET or POST for the method parameter. Got ${method}.`)
  }

  if (Object.prototype.toString.call(date) !== '[object Date]' || isNaN(date.getTime())) {
    let t = Object.prototype.toString.call(date)
    throw new TypeError(`Expected date to be a Date Object. Got ${t} instead.`)
  }

  // let contentMD5 = generateContentHash(date, hashParam, hashHeader)
  let contentMD5 = ''
  let time = Math.floor(date.getTime() / 1000)
  let formType = (method === 'POST') ? 'application/x-www-form-urlencoded' : ''

  let data = `${method}\n${contentMD5}\n${formType}\n${time}\n${uid}${path}`

  let hmac = CryptoJS.HmacSHA1(data, key).toString(CryptoJS.enc.Base64)

  console.log(`hmac hash: ${hmac}`)

  return hmac
}

function generateHashParamFromObject (content) {
  let result = ''
  for (let k in content) {
    result = result + `${k}=${content[k]}&`
  }

  return result.substring(0, result.length - 1) // substract the last "&"
}

module.exports = {
  'generate': generate,
  'generateHashParam': generateHashParamFromObject,
  'generateContentHash': generateContentHash
}
