import React, {Component} from 'react'
import './Panel.scss'

class Panel extends Component {
  render () {
    return (
      <div className={'panel' + ' ' + this.props.injectClassName}>
        {this.props.children}
      </div>
    )
  }
}

export default Panel
