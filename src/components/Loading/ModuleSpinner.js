import React, { Component } from 'react'
import './Spinner.scss'

class ModuleSpinner extends Component {
  render () {
    return (
      <div className='loading__container-module'>
        <div className='loading__wrap-module'>
          <div className='loading__line-mask'>
            <div className='loading__line' />
          </div>
          <div className='loading__image' />
        </div>
      </div>
    )
  }
}

export default ModuleSpinner
