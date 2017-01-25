import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import './DigitalProductSelectGroup.scss'

class DigitalProductSelectGroup extends Component {

  static propTypes = {
    useDrawer: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array
  }

  constructor (props) {
    super(props)
  }

  render () {
    if (this.props.useDrawer) {
      return (
        <div className='dp-inputgroup'>
          <label className='dp-inputgroup__label u-mb1'>{this.props.label}</label>
          <div className='dp-inputgroup__select'>
            <span>{this.props.value ? this.props.value : this.props.placeholder}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className='dp-inputgroup'>
          <label className='dp-inputgroup__label u-mb1'>{this.props.label}</label>
          <select className='dp-inputgroup__select' defaultValue=''>
            <option value='' disabled>{this.props.placeholder}</option>
            {this.props.options.map(function(option, index) {
              return (
                <option key={index} value={option.value}>{option.name}</option>
              )
            })}
          </select>
        </div>
      )
    }
  }
}

export default DigitalProductSelectGroup
