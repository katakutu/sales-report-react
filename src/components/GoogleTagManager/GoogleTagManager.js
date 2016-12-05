import React, { Component } from 'react'
import gtmParts from 'react-google-tag-manager'

class GoogleTagManager extends Component {
  static propTypes = {
    gtmID: React.PropTypes.string.isRequired,
    dataLayerName: React.PropTypes.string,
    additionalEvents: React.PropTypes.object,
    scriptId: React.PropTypes.string
  }

  componentDidMount () {
    const dataLayerName = this.props.dataLayerName || 'dataLayer'
    const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm'

    if (!window[dataLayerName]) {
      const gtmScriptNode = document.getElementById(scriptId)

      /* eslint-disable no-eval */
      eval(gtmScriptNode.textContent)
      /* eslint-enable no-eval */
    }
  }

  render () {
    const gtm = gtmParts({
      id: this.props.gtmID,
      dataLayerName: this.props.dataLayerName || 'dataLayer',
      additionalEvents: this.props.additionalEvents || {}
    })

    return (
      <div>
        <div>{gtm.noScriptAsReact()}</div>
        <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
          {gtm.scriptAsReact()}
        </div>
      </div>
    )
  }
}

export default GoogleTagManager
