import React, { Component } from 'react'
import gtmParts from 'react-google-tag-manager'

class PulsaWidget extends Component {
  static propTypes = {
    gtmId: React.PropTypes.string.isRequired,
    dataLayerName: React.PropTypes.string,
    additionalEvents: React.PropTypes.object,
    scriptId: React.PropTypes.string
  }

  componentDidMount () {
    const dataLayerName = this.props.dataLayerName || 'dataLayer'
    const scriptId = this.props.scriptId || 'react-google-tag-manager-gtm'

    if (!window[dataLayerName]) {
      const gtmScriptNode = document.getElementById(scriptId)

      console.log(gtmScriptNode.textContent)
    }
  }

  render () {
    const gtm = gtmParts({
      id: this.props.gtmId,
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

export default PulsaWidget
