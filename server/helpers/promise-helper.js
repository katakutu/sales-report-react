function delay (time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

function timeout (promise, time, name) {
  return new Promise(function (resolve, reject) {
    // race promise against delay
    promise.then(resolve, reject)
    delay(time).then(function () {
      reject(new Error(`Operation ${name} timed out`))
    })
  })
}

module.exports = {
  delay: delay,
  timeout: timeout
}
