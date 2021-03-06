const GTM = {
  pushEvent: function (eventName, eventCategory, eventAction, eventLabel) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'event': eventName,
      'eventCategory': eventCategory,
      'eventAction': eventAction,
      'eventLabel': eventLabel
    })
  },
  pushEventName: function (eventName) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      'event': eventName
    })
  },
  pushObject: function (object) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(object)
  }
}

export default GTM
