import { GA_PROPERTY_ID } from '../../constants'

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
      const name = ga.getAll().map(t => t.get('name'))[0]
      ga(`${name}.send`, 'pageview', path)
    }
  }
}

export default GA
