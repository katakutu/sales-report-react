import React, { Component } from 'react'
import { Link } from 'react-router'

class LoggedOutTab extends Component {
  render () {
    return (
      <div className='tab logged-out'>
        <div className='tab-item active'>
          <label className='tab-link'>
            <Link href='/'>Home</Link>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <a href='https://m.tokopedia.com/hot?page=1'>Hot List</a>
          </label>
        </div>
      </div>
    )
  }
}

export default LoggedOutTab
