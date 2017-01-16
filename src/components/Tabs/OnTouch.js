let setting = {
  touchsurface: null,
  dir: null,
  swipeType: null,
  startX: 0,
  startY: 0,
  distX: 0,
  distY: 0,
  threshold: 150,
  restraint: 100,
  allowedTime: 500,
  elapsedTime: 0,
  startTime: 0,
  handletouch: null
}

let OnTouch = {
  load: function (el, callback) {
    setting.touchsurface = el
    setting.handletouch = callback ||
    function (evt, dir, phase, swipetype, distance) { }

    setting.touchsurface.addEventListener('touchstart', function (e) {
      let touchobj = e.changedTouches[0]
      setting.dir = 'none'
      setting.swipeType = 'none'
      setting.startX = touchobj.pageX
      setting.startY = touchobj.pageY
      setting.startTime = new Date().getTime()
      setting.handletouch(e, 'none', 'start', setting.swipeType, 0)
    }, false)

    setting.touchsurface.addEventListener('touchmove', function (e) {
      let touchobj = e.changedTouches[0]
      setting.distX = touchobj.pageX - setting.startX
      setting.distY = touchobj.pageY - setting.startY
      if (Math.abs(setting.distX) > Math.abs(setting.distY)) {
        setting.dir = (setting.distX < 0) ? 'left' : 'right'
        setting.handletouch(e, setting.dir, 'move', setting.swipeType, setting.distX)
      } else {
        setting.dir = (setting.distY < 0) ? 'up' : 'down'
        setting.handletouch(e, setting.dir, 'move', setting.swipeType, setting.distY)
      }
    }, false)

    setting.touchsurface.addEventListener('touchend', function (e) {
      setting.elapsedTime = new Date().getTime() - setting.startTime
      if (setting.elapsedTime <= setting.allowedTime) {
        if (Math.abs(setting.distX) >= setting.threshold && Math.abs(setting.distY) <= setting.restraint) {
          setting.swipeType = setting.dir
        } else if (Math.abs(setting.distY) >= setting.threshold &&
          Math.abs(setting.distX) <= setting.restraint) {
          setting.swipeType = setting.dir
        }
      }
      setting.handletouch(e, setting.dir, 'end', setting.swipeType,
      (setting.dir === 'left' || setting.dir === 'right') ? setting.distX : setting.distY)
    }, false)
  }
}

export default OnTouch
