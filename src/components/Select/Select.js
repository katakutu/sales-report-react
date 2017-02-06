import React, { Component } from 'react'
import './Select.scss'

class Select extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func,
    product: React.PropTypes.object
  }

  static defaultProps = {
    className: ''
  }

  render () {
    let productDesc = this.props.product.desc ? this.props.product.desc : "Pilih"
    return (
      <div>
        <select name='' id={this.props.id} className='u-hide'>
          {this.props.children}
        </select>
        <div className='select' onClick={this.props.onClick}>
          {productDesc}
        </div>
      </div>
    )
  }
}

export default Select
