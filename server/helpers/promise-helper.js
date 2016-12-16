function delay(time) {
  return new Promise(function (fulfill) {
    setTimeout(fulfill, time);
  });
}

function timeout(promise, time) {
  return new Promise(function (fulfill, reject) {
    // race promise against delay
    promise.then(fulfill, reject);
    delay(time).then(function () {
      reject(new Error('Operation timed out'));
    });
  });
}

module.exports = {
    delay: delay,
    timeout: timeout
}