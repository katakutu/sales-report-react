import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { appIsLoading } from '../../store/app'
import { HOSTNAME } from '../../constants'

class LoggedOutTab extends Component {
  static propTypes = {
    appIsLoading: React.PropTypes.func
  }

  render () {
    return (
      <div className='tab logged-out'>
        <div className='tab-item active'>
          <label className='tab-link'>
            <Link to='/'>Home</Link>
          </label>
        </div>
        <div className='tab-item'>
          <label className='tab-link'>
            <Link to={`${HOSTNAME}/hot?page=1`}>
              Hot List
            </Link>
          </label>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { appIsLoading }
export default connect(undefined, mapDispatchToProps)(LoggedOutTab)
