import React, { Component, PropTypes } from 'react'
import './DigitalProductInformationBox.scss'

class DigitalProductInformationBox extends Component {

  static propTypes = {
    isList: PropTypes.bool,
    content: PropTypes.string
  }

  render () {
    if (!this.props.isList) {
      return (
        <div className='dp-informationbox u-mb1 u-border-box'>
          <p className='dp-informationbox__title u-h4'>Keterangan</p>
          <p className='dp-informationbox__content u-h4 u-m0'>{this.props.content}</p>
        </div>
      )
    } else {
      return (
        <div className='dp-informationbox u-mb1 u-border-box'>
          <p className='dp-informationbox__title u-h4'>Keterangan</p>
          <p className='dp-informationbox__content u-h4 u-m0'>{this.props.content.map(function (item, index) {
            return (
              <div key={index}>{item.text} <br /></div>
            )
          })}</p>
        </div>
      )
    }
  }
}

export default DigitalProductInformationBox
