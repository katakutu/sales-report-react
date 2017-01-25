import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import './DigitalProductRadioButtons.scss'

class DigitalProductRadioButtons extends Component {

  static propTypes = {
    buttons: PropTypes.array
  }

  render () {
    return (
      <div>
        {this.props.buttons.map(function(button, index) {
          return (
            <div className='dp-radio'>
              <input type='radio' id={button.id} className='u-hide' checked={button.checked} />
              <label htmlFor={button.id} className='dp-radio__label'>
                <span className='dp-radio__icon'></span>
                <span className='dp-radio__text'>{button.text}</span>
              </label>
            </div>
          )
        })}
      </div>
    )
  }
}

export default DigitalProductRadioButtons
