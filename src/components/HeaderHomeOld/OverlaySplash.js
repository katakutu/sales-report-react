import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateSidebarStatus } from '../../store/app'

class OverlaySplash extends Component {
  static propTypes = {
    updateSidebarStatus: React.PropTypes.func
  }

  constructor (props) {
    super(props)
    this.closeSidebar = this.closeSidebar.bind(this)
  }

  closeSidebar () {
    this.props.updateSidebarStatus(false)
  }

  render () {
    return (
      <div className='drawer-active__overlay'onClick={this.closeSidebar} />
    )
  }
}

const mapDispatchToProps = { updateSidebarStatus }
export default connect(undefined, mapDispatchToProps)(OverlaySplash)
