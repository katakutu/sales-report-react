import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import './DigitalProductSelectGroup.scss'

class DigitalProductSelectGroup extends Component {

  static propTypes = {
    useDrawer: PropTypes.bool,
    label: PropTypes.string
  }

  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.useDrawer) {
      return (
        <div></div>
      )
    } else {
      return (
        <div className='dp-inputgroup'>
          <label className='dp-inputgroup__label u-mb1'>{this.props.label}</label>
        </div>
      )
    }
  }
}

export default DigitalProductSelectGroup
