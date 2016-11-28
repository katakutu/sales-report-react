import React, { Component } from 'react'
import './Panel.scss'

class Panel extends Component {
  static propTypes = {
    injectClassName: React.PropTypes.string,
    children: React.PropTypes.node
  }

  render () {
    return (
      <div className={'panel' + ' ' + this.props.injectClassName}>
        {this.props.children}
      </div>
    )
  }
}

export default Panel
