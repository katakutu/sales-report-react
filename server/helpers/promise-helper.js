function delay (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

function timeout (promise, time) {
  return new Promise(function (resolve, reject) {
    // race promise against delay
    promise.then(resolve, reject)
    delay(time).then(function () {
      reject(new Error('Operation timed out'))
    })
  })
}

module.exports = {
  delay: delay,
  timeout: timeout
}
