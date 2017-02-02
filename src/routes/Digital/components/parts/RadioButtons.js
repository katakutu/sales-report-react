import React, { Component, PropTypes } from 'react'
import './RadioButtons.scss'

class RadioButtons extends Component {

  static propTypes = {
    buttons: PropTypes.array
  }

  render () {
    return (
      <div>
        {this.props.buttons.map(function (button, index) {
          return (
            <div className='dp-radio' key={index}>
              <input type='radio' id={button.id} name={button.name}
                className='u-hide' defaultChecked={button.checked} />
              <label htmlFor={button.id} className='dp-radio__label'>
                <span className='dp-radio__icon' />
                <span className='dp-radio__text'>{button.text}</span>
              </label>
            </div>
          )
        })}
      </div>
    )
  }
}

export default RadioButtons
