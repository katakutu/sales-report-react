import React, { Component } from 'react'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './DrawerContent.scss'

class DrawerContent extends Component {
  static propTypes = {
    title: React.PropTypes.string
  }

  constructor (props) {
    super(props)

    this.handleCloseButton = this.handleCloseButton.bind(this)
    this.state = {
      open: true
    }
  }

  handleCloseButton (e) {
    this.setState({ open: false })
  }

  render () {
    return (
      <div className={classNames('drawer-content', { 'active': this.state.open })}>
        <div className='dc-wrapper'>
          <div className='dc-content'>
            <div className='dc-header'>
              {this.props.title}
              <span className='dc-close' onClick={this.handleCloseButton}></span>
            </div>
            <div className='dc-body'>

              <table className='dc-list'>
                <tbody>

                  {/* loop goes here */}
                  <tr>
                    <td className='dc-product__container'>
                      <label htmlFor='item-1'>
                        <div className='dc-product__name'>Rp 25.000</div>
                        <p className='dc-product__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <div className='dc-product__price'>
                          <div className='dc-price--normal u-mr1'>Rp 25.000</div>
                        </div>
                      </label>
                    </td>
                    <td className='dc-radio__container'>
                      <input name='input_product' id='item-1' type='radio' className='dc-radio u-hide' />
                      <label htmlFor='item-1' className='dc-radio__icon' />
                    </td>
                  </tr>

                  <tr>
                    <td className='dc-product__container'>
                      <label htmlFor='item-2'>
                        <div className='dc-product__name'>Rp 50.000</div>
                        <p className='dc-product__desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        <div className='dc-product__price'>
                          <div className='dc-price--discount u-mr1'>Rp 49.000</div>
                          <div className='dc-price--strikethrough u-mr1'>Rp 50.000</div>
                        </div>
                      </label>
                    </td>
                    <td className='dc-radio__container'>
                      <input name='input_product' id='item-2' type='radio' className='dc-radio u-hide' />
                      <label htmlFor='item-2' className='dc-radio__icon' />
                    </td>
                  </tr>

                </tbody>
              </table>

            </div>
          </div>
        </div>
        <div className='dc-overlay' />

        { this.state.open && <BodyClassName className='u-body-overflow-no-scroll' /> }
      </div>
    )
  }
}

export default DrawerContent
