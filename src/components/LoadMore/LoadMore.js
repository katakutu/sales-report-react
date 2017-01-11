import React, { Component } from 'react'
import './LoadMore.scss'

class LoadMore extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    className: ''
  }

  render () {
    return (
      <div className={'u-clearfix loadmore-container ' + this.props.className}>
        <div className='loadmore__box'>
          <button className='loadmore__link' onClick={this.props.onClick}>
            {this.props.children}
          </button>
        </div>
      </div>
    )
  }
}

export default LoadMore
