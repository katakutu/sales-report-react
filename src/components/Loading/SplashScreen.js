import React, { Component } from 'react'

class SplashScreen extends Component {
  render () {
    return (
      <div id='splash-screen' className='splash__container'>
        <div className='splash__wrap'>
          <div className='splash__line-mask'>
            <div className='splash__line' />
          </div>
          <div className='splash__image' />
        </div>
      </div>
    )
  }
}

export default SplashScreen
