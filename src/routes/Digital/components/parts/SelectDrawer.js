import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './SelectDrawer.scss'

class SelectDrawer extends Component {
  static propTypes = {
    selectedOperator: PropTypes.object,
    handleProductSelect: PropTypes.func,
    handleCloseButton: PropTypes.func,
    open: PropTypes.bool,
    productList: PropTypes.array,
    productId: PropTypes.number
  }

  constructor (props) {
    super(props)

    this.renderProduct = this.renderProduct.bind(this)
  }

  renderProduct (data, index) {
    let checkFlag = false
    if (data.operator_id === this.props.selectedOperator.id) {
      if (this.props.productId === data.id) {
        checkFlag = true
      }
      return (
        <tr key={index}>
          <td className='table__product'>
            <label htmlFor={data.id}>
              <div className='product__name'>{data.desc}</div>
              <div className='product__price'>
                <div className='price u-mr1'>{data.price}</div>
              </div>
            </label>
          </td>
          <td className='table__radio'>
            <input name='donation-nominal'
              id={data.id}
              type='radio'
              className='drawer__radio u-hide'
              value={data.id}
              onChange={this.props.handleProductSelect}
              defaultChecked={checkFlag} />
            <label htmlFor={data.id} className='drawer__icon--radio' />
          </td>
        </tr>
      )
    }
  }

  render () {
    return (
      <div className={classNames('dp-drawer--select', { 'active': this.props.open })}>
        <div className='drawer__content'>
          <div className='drawer__header'>
            Nominal
            <span className='drawer__close' onClick={this.props.handleCloseButton}>&times;</span>
          </div>
          <div className='drawer__options'>
            <table className='drawer__table'>
              <tbody>
                {this.props.productList.map(this.renderProduct)}
              </tbody>
            </table>
          </div>
        </div>
        <div className='drawer__overlay' />

        { this.props.open && <BodyClassName className='u-body-overflow-no-scroll' /> }
      </div>
    )
  }
}

export default SelectDrawer
