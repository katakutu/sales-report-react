import React, { Component } from 'react'
import classNames from 'classnames'
import './DrawerContent.scss'

class DrawerContent extends Component {
  static propTypes = {
    open: React.PropTypes.bool,
    type: React.PropTypes.string,
    title: React.PropTypes.string,
    content: React.PropTypes.array,
    defaultId: React.PropTypes.number,
    selectedOperator: React.PropTypes.object,
    handleContent: React.PropTypes.func,
    handleCloseDrawer: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.handleCloseButton = this.handleCloseButton.bind(this)
    this.handleContent = this.handleContent.bind(this)

    this.renderOperator = this.renderOperator.bind(this)
    this.renderProductList = this.renderProductList.bind(this)
    this.renderMenuList = this.renderMenuList.bind(this)
  }

  handleContent (data, index) {
    this.props.handleContent(data, index)
  }

  handleCloseButton (e) {
    this.props.handleCloseDrawer()
  }

  renderOperator (data, index) {
    return (
      <tr key={index} onClick={() => this.handleContent(data)}>
        <td className='dc-product__container'>
          <label htmlFor={'item-' + data.id}>
            <div className='dc-product__name'>{ data.name }</div>
          </label>
        </td>
        <td className='dc-radio__container'>
          <input name='input_product' id={'item-' + data.id}
            type='radio'
            className='dc-radio u-hide'
            checked={this.props.defaultId === data.id ? 'checked' : false} />
          <label htmlFor={'item-' + data.id} className='dc-radio__icon' />
        </td>
      </tr>
    )
  }

  renderProductList (data, index) {
    let productPricePromo
    let productPrice
    let productDesc = { __html: data.detail };

    if (this.props.selectedOperator.id !== data.operator_id) {
      return
    } else if (this.props.selectedOperator.show_price) {
      if (data.promo == null) {
        productPrice = <div className='dc-price--normal u-mr1'>{ data.price }</div>
      } else {
        productPricePromo = <div className='dc-price--discount u-mr1'>{ data.promo.new_price }</div>
        productPrice = <div className='dc-price--strikethrough u-mr1'>{ data.price }</div>
      }
    }
    return (
      <tr key={index} onClick={() => this.handleContent(data)}>
        <td className='dc-product__container'>
          <label htmlFor={'item-' + data.id}>
            <div className='dc-product__name'>{ data.desc }</div>
            <p className={classNames('dc-product__desc',
                { 'u-hide' : data.detail === '' })}
              dangerouslySetInnerHTML={productDesc} />
            <div className={classNames('dc-product__price', { 'u-hide': !this.props.selectedOperator.show_price })}>
              { productPricePromo }
              { productPrice }
            </div>
          </label>
        </td>
        <td className='dc-radio__container'>
          <input name='input_product' id={'item-' + data.id}
            type='radio'
            className='dc-radio u-hide'
            checked={this.props.defaultId === data.id ? 'checked' : false} />
          <label htmlFor={'item-' + data.id} className='dc-radio__icon' />
        </td>
      </tr>
    )
  }

  renderMenuList (data, index) {
    if (index < 3) {
      return
    }
    return (
      <tr id={index} onClick={() => this.handleContent(data, index)}>
        <td className='dc-product__container'>
          <label htmlFor={'menu-item-' + data.id}>
            <span className='dc-product__menu-list'>
              {data.name}
            </span>
          </label>
        </td>
        <td className='dc-radio__container'>
          <input name='input_product' id={'menu-item-' + data.id}
            type='radio'
            className='dc-radio u-hide'
            checked={this.props.defaultId === data.id ? 'checked' : false} />
          <label htmlFor={'menu-item-' + data.id} className='dc-radio__icon' />
        </td>
      </tr>
    )
  }

  render () {
    return (
      <div className={classNames('drawer-content', { 'active': this.props.open })}>
        <div className='dc-wrapper'>
          <div className='dc-content'>
            <div className='dc-header'>
              {this.props.title}
              <span className='dc-close' onClick={this.handleCloseButton} />
            </div>
            <div className='dc-body'>

              <table className='dc-list'>
                <tbody>
                  { this.props.type === 'menu'
                    ? this.props.content.map(this.renderMenuList)
                    : this.props.type === 'operator'
                      ? this.props.content.map(this.renderOperator)
                      : this.props.type === 'product'
                        ? this.props.content.map(this.renderProductList)
                        : '' }
                </tbody>
              </table>

            </div>
          </div>
        </div>
        <div className='dc-overlay' />
      </div>
    )
  }
}

export default DrawerContent
