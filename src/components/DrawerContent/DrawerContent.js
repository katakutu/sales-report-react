import React, { Component } from 'react'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './DrawerContent.scss'

class DrawerContent extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    open: React.PropTypes.bool,
    isMenu: React.PropTypes.bool,
    handlePruductDrawer: React.PropTypes.func,
    handleProuductChange: React.PropTypes.func,
    selectedOperator: React.PropTypes.object,
    productList: React.PropTypes.array,
    productId: React.PropTypes.number
  }

  constructor (props) {
    super(props)

    this.handleCloseButton = this.handleCloseButton.bind(this)
    this.handleProduct = this.handleProduct.bind(this)
    this.renderProductList = this.renderProductList.bind(this)
    this.state = {
      open: this.props.open
    }
  }

  handleProduct (data, index) {
    this.props.handleProuductChange(data)
  }

  handleCloseButton (e) {
    this.setState({ open: false })
    this.props.handlePruductDrawer()
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
      <tr key = {index} onClick={() => this.handleProduct(data)}>
        <td className='dc-product__container'>
          <label htmlFor={'item-', data.id}>
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
          <input name='input_product' id={'item-', data.id}
            type='radio'
            className='dc-radio u-hide'
            checked={this.props.productId === data.id ? 'checked' : false}/>
          <label htmlFor={'item-', data.id} className='dc-radio__icon' />
        </td>
      </tr>
    )
  }

  renderMenuList (data, index) {
    return (
      <tr>
        <td className='dc-product__container'>
          <label htmlFor={'menu-item-' + data.id}>
            <span className='dc-product__menu-list'>
              Pulsa
            </span>
          </label>
        </td>
        <td className='dc-radio__container'>
          <input name='input_product' id={'menu-item-' + data.id}
            type='radio'
            className='dc-radio u-hide' />
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
                  { this.props.isMenu
                    ? this.props.productList.map(this.renderMenuList)
                    : this.props.productList.map(this.renderProductList)}
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
