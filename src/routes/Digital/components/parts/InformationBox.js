import React, { Component, PropTypes } from 'react'
import './InformationBox.scss'

class InformationBox extends Component {

  static propTypes = {
    isList: PropTypes.bool,
    content: PropTypes.string,
    withTitle: PropTypes.bool,
    title: PropTypes.string,
    boxType: PropTypes.string
  }

  static defaultProps = {
    withTitle: true,
    title: 'Keterangan',
    boxType: 'green'
  }

  render () {
    if (!this.props.isList) {
      return (
        <div className={'dp-informationbox u-mb1 u-border-box dp-informationbox--' + this.props.boxType}>
          <p className='dp-informationbox__title u-h4'>{this.props.title}</p>
          <p className='dp-informationbox__content u-h4 u-m0'>{this.props.content}</p>
        </div>
      )
    } else {
      return (
        <div className={'dp-informationbox u-mb1 u-border-box dp-informationbox--' + this.props.boxType}>
          <p className='dp-informationbox__title u-h4'>{this.props.title}</p>
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

export default InformationBox
