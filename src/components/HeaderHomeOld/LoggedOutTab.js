import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { appIsLoading } from '../../store/app'

class LoggedOutTab extends Component {
  static propTypes = {
    appIsLoading: React.PropTypes.func,
    activeTab: React.PropTypes.string
  }

  render () {
    const homeCN = this.props.activeTab === 'home' ? 'tab-item active' : 'tab-item'
    const hlCN = this.props.activeTab === 'hotlist' ? 'tab-item active' : 'tab-item'

    return (
      <div className='tab logged-out'>
        <div className={homeCN}>
          <label className='tab-link'>
            <Link to='/'>Home</Link>
          </label>
        </div>
        <div className={hlCN}>
          <label className='tab-link'>
            <Link to={`/hot?page=1`}>
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
