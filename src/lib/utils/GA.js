const GA = {
    /**
     * Get the google analytics function
     *
     * @returns {function} the Google Analytics function
     */
  getFunction: function () {
    const ga = window.GoogleAnalyticsObject || 'ga'

    return window[ga]
  },
    /**
     * Record the URL path you want as pageview
     *
     * @param {string} path The complete URL path you want to send. E.g. '/hot?page=2'
     */
  setPageView: function (path) {
    const ga = this.getFunction()
    if (typeof ga === 'function') {
      ga('set', 'page', path)
      ga('send', 'pageview')
    }
  }
}

export default GA
