const OnTouch = {
  load: function (el, callback) {
    var touchsurface = el
    var dir
    var swipeType
    var startX
    var startY
    var distX
    var distY
    var threshold = 150
    var restraint = 100
    var allowedTime = 500
    var elapsedTime
    var startTime
    var handletouch = callback ||
    function (evt, dir, phase, swipetype, distance) { }

    touchsurface.addEventListener('touchstart', function (e) {
      var touchobj = e.changedTouches[0]
      dir = 'none'
      swipeType = 'none'
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime()
      handletouch(e, 'none', 'start', swipeType, 0)
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX
      distY = touchobj.pageY - startY
      if (Math.abs(distX) > Math.abs(distY)) {
        dir = (distX < 0) ? 'left' : 'right'
        handletouch(e, dir, 'move', swipeType, distX)
      } else {
        dir = (distY < 0) ? 'up' : 'down'
        handletouch(e, dir, 'move', swipeType, distY)
      }
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
      elapsedTime = new Date().getTime() - startTime
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          swipeType = dir
        } else if (Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint) {
          swipeType = dir
        }
      }
      handletouch(e, dir, 'end', swipeType, (dir === 'left' || dir === 'right') ? distX : distY)
    }, false)
  }
}

export default OnTouch
