import React, { Component, PropTypes } from 'react'
import './DigitalWidget.scss'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import TextInput from '../../components/TextInput'
import Select from '../../components/Select'
import Label from '../../components/Label'
import DrawerContent from '../../components/DrawerContent'
import classNames from 'classnames'

class DigitalWidgetView extends Component {
  static propTypes = {
    categoryList: PropTypes.array,
    operatorList: PropTypes.array,
    prefixList: PropTypes.array,
    productList: PropTypes.array
  }

  constructor (props) {
    super(props)

    this.state = {
      openDrawer: false,
      errorMessage: {
        errClientNumber : '',
        errSelectedProduct : ''
      },
      clientNumber: '',
      instantCheckout: false,
      textButton: 'Beli',
      disabledButton: false,
      selectedCategory: {},
      selectedOperator: {},
      selectedProduct: {},
      filteredOperator: {},
      productList: []
    }

    this.renderCategory = this.renderCategory.bind(this)
    this.renderOperator = this.renderOperator.bind(this)
    this.renderDataContent = this.renderDataContent.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleOperatorChange = this.handleOperatorChange.bind(this)
    this.handleProuductChange = this.handleProuductChange.bind(this)
    this.handlePruductDrawer = this.handlePruductDrawer.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handleInstanCheckout = this.handleInstanCheckout.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormMessage = this.handleFormMessage.bind(this)
    this.handleClearButton = this.handleClearButton.bind(this)
  }

  isActiveCategory (id) {
    if (this.state.selectedCategory.id === id) {
      return true
    } else {
      return false
    }
  }

  isItemInModal (index) {
    if (index < 4) {
      return true
    } else {
      return false
    }
  }

  handleTabChange (data) {
    this.setState({
      selectedCategory: data,
      selectedOperator: {},
      errorMessage: {
        errClientNumber : ''
      }
    })
    if (!data.instant_checkout_available) {
      this.setState({
        textButton: 'Beli',
        instantCheckout: false
      })
    }
    if (data.id !== this.state.selectedCategory) {
      this.renderDataContent(data)
    }
  }

  handleOperatorChange (data) {
    this.setState({
      selectedOperator: data
    })

    var iter = 0
    this.state.productList.map((product, index) => {
      if (product.operator_id === data.id) {
        iter++
        if (iter === 3) {
          this.handleProuductChange(product)
          return
        }
      }
    })
  }

  handleProuductChange (data) {
    if (data.id !== this.state.selectedProduct.id) {
      this.setState({
        selectedProduct: data,
        openDrawer: false
      })
    }
  }

  handlePrefixChange (clientNumber) {
    this.setState({
      errorMessage: {
        errClientNumber : ''
      }
    })

    if (clientNumber.length > 3) {
      clientNumber = clientNumber.substring(0, 4)
      for (var i in this.props.prefixList) {
        var ok = false
        if (clientNumber.indexOf(this.props.prefixList[i].prefix) === 0) {
          for (var j in this.state.filteredOperator) {
            if (this.state.filteredOperator[j].id === this.props.prefixList[i].id) {
              this.setState({
                selectedOperator: this.state.filteredOperator[j]
              })
              this.handleOperatorChange(this.state.filteredOperator[j])
              ok = true
              break
            }
          }
        }
        if (ok) {
          break
        }
      }
    } else if (this.state.selectedCategory.validate_prefix) {
      this.setState({
        selectedOperator: {}
      })
    }
  }

  handlePruductDrawer () {
    this.setState({
      openDrawer: !this.state.openDrawer
    })
  }

  handleNumberChange (e) {
    var clientNumber = e.target.value.replace(/(\+|\b)62/, '0')
    this.setState({
      clientNumber: clientNumber
    })
    this.handlePrefixChange(clientNumber)
  }

  handleClearButton () {
    this.setState({
      clientNumber: ''
    })
    this.handlePrefixChange('')
  }

  handleInstanCheckout () {
    if (this.state.instantCheckout) {
      this.setState({
        textButton : 'Beli',
        instantCheckout : !this.state.instantCheckout
      })
    } else {
      this.setState({
        textButton : 'Bayar',
        instantCheckout : !this.state.instantCheckout
      })
    }
  }

  handleFormSubmit (e) {
    if (this.state.selectedCategory.client_number.is_shown && this.state.clientNumber === '') {
      this.setState({
        errorMessage: { errClientNumber : this.handleFormMessage('ERROR_EMPTY_NUMBER') }
      })
    } else if (!this.state.selectedOperator.id) {
      this.setState({
        errorMessage: { errClientNumber : this.handleFormMessage('ERROR_NO_OPERATOR') }
      })
    } else if (this.state.selectedCategory.client_number.is_shown) {
      if (this.state.clientNumber === '') {
        this.setState({
          errorMessage: { errClientNumber : this.handleFormMessage('ERROR_EMPTY_NUMBER') }
        })
      } else if (this.state.clientNumber.length < this.state.selectedOperator.minimum_length) {
        this.setState({
          errorMessage: {
            errClientNumber : this.handleFormMessage('ERROR_MIN_NUMBER',
              this.state.selectedOperator.minimum_length)
          }
        })
      } else if (this.state.clientNumber.length > this.state.selectedOperator.maximum_length) {
        this.setState({
          errorMessage: {
            errClientNumber : this.handleFormMessage('ERROR_MAX_NUMBER',
              this.state.selectedOperator.maximum_length)
          }
        })
      } else {
        this.setState({
          textButton: this.handleFormMessage('LOADING_2'),
          disabledButton: true
        })
        return true
      }
    }

    e.preventDefault()
  }

  handleFormMessage (msg, digit) {
    var RLang = {
      'LOADING'         : 'Memuat',
      'LOADING_2'       : 'Memuat...',
      'ERROR_EMPTY_NUMBER' : 'Nomor harus diisi',
      'ERROR_MIN_NUMBER' : 'Nomor terlalu pendek, minimal ' + digit + ' karakter',
      'ERROR_MAX_NUMBER' : 'Nomor terlalu panjang, maksimal ' + digit + ' karakter',
      'ERROR_NO_OPERATOR' : 'Nomor yang Anda masukkan belum didukung saat ini',
      'ERROR_DIGIT_NUMBER' : 'Nomor hanya boleh mengandung angka',
      'ERROR_EMPTY_OPERATOR' : 'Nomor tidak valid',
      'ERROR_EMPTY_OPERATOR_FINANCE' : 'Penyedia finansial harus dipilih',
      'ERROR_EMPTY_PRODUCT' : 'Nominal harus dipilih',
      'OUT_OF_STOCK' : 'Stok kosong'
    }

    return RLang[msg]
  }

  renderCategory (data, index) {
    var inModal = this.isItemInModal(index)
    var isActiveTab = this.isActiveCategory(data.id)
    return (
      <li key={index}
        className={classNames('dpw-tab__item dpw-grid-1-4',
          { 'u-hide': !inModal },
          { 'active': isActiveTab })}
        onClick={() => this.handleTabChange(data)}>
        <a className='dpw-tab__link'>
          <label className='dpw-tab__label' href='#'>{data.name}</label>
          <i className='dpw-tab__normalizer' />
        </a>
      </li>
    )
  }

  renderOperator (data, index) {
    var isChecked = false
    if (data.id === this.state.selectedOperator.id) {
      isChecked = true
    }
    return (
      <span key={index}>
        <input id={'radio_' + data.id} name='operator_id'
          type='radio' className='dpw-radio'
          checked={isChecked}
          value={data.id}
          onChange={() => this.handleOperatorChange(data)} />
        <label htmlFor={'radio_' + data.id}>
          <span />{data.name}
        </label>
      </span>
    )
  }

  renderClientNumber () {
    if (!this.state.selectedCategory.id) {
      return
    }
    var placeholder = this.state.selectedCategory.id ? this.state.selectedCategory.client_number.placeholder : ''
    return (
      <div
        className={classNames('dpw-form-group', { 'is-error' : this.state.error })}>
        <Label htmlFor='no_telp'>{this.state.selectedCategory.client_number.text}</Label>
        <div className='u-relative dpw-input--with-image'>
          <TextInput type='number' id='no_telp'
            name='client_number'
            value={this.state.clientNumber}
            placeholder={placeholder}
            onChange={this.handleNumberChange} />
          <div className={classNames('error-message',
              { 'is-error' :  this.state.errorMessage.errClientNumber !== '' },
              { 'u-hide' : this.state.errorMessage.errClientNumber === '' })}>
            {this.state.errorMessage.errClientNumber}
          </div>
          <img className={classNames('dpw-operator-image',
              { 'u-hide' : !this.state.selectedOperator.id })}
            src={this.state.selectedOperator.image} />
          <div className={classNames('dpw-input-clear',
              { 'u-hide' : this.state.clientNumber.length === 0 })}
            onClick={this.handleClearButton}>Clear</div>
        </div>
      </div>
    )
  }

  renderDataContent (category) {
    const productList = []
    const operatorList = []
    const filteredOperator = []

    this.props.productList.map((data, index) => {
      if (data.category_id === category.id && data.status === 1) {
        productList.push(data)
        operatorList.push(data.operator_id)
      }
    })

    productList.sort(function (a, b) {
      return a.id - b.id
    })

    this.state.productList = productList

    this.props.operatorList.map((data, index) => {
      if (operatorList.indexOf(data.id) > -1) {
        filteredOperator.push(data)
      }
    })

    this.state.filteredOperator = filteredOperator

    if (category.default_operator_id !== '0') {
      filteredOperator.map((data, index) => {
        if (data.id === parseInt(category.default_operator_id)) {
          this.handleOperatorChange(data)
          return
        }
      })
    }

    if (category.validate_prefix) {
      this.handlePrefixChange(this.state.clientNumber)
    }
  }

  componentWillMount () {
    this.handleTabChange(this.props.categoryList[0])
  }

  render () {
    return (
      <div className='digital-product-widget u-clearfix'>
        <div className='dpw-container u-clearfix'>
          <div className='dpw-header u-clearfix'>
            <ul className='dpw-tab u-clearfix'>
              { this.props.categoryList.map(this.renderCategory) }
            </ul>
            <button className='dpw-others__btn'>
              <i className='dpw-others__icon' />
            </button>
          </div>
          <div className='dpw-content u-clearfix'>
            <form method='GET' action='https://pulsa.tokopedia.com/' onSubmit={this.handleFormSubmit}>
              <input
                type='hidden'
                value='init_data'
                name='action' />
              <input
                type='hidden'
                name='product_id'
                value={this.state.selectedProduct.id} />
              <div className={classNames('dpw-selection', { 'u-hide' : !this.state.selectedCategory.show_operator })}>
                { this.state.filteredOperator.map(this.renderOperator) }
              </div>

              { this.renderClientNumber() }

              <div className={classNames('dpw-form-group', { 'u-hide' : !this.state.selectedOperator.show_product })}>
                <Label htmlFor='nominal'>{ this.state.selectedOperator.product_text }</Label>
                <Select id='nominal'
                  onClick={this.handlePruductDrawer}
                  product={this.state.selectedProduct} />
              </div>

              <div className={classNames('dpw-form-group',
                { 'u-hide' : !this.state.selectedCategory.instant_checkout_available })}>
                <Checkbox id='instant'
                  isChecked={this.state.instantCheckout}
                  name='instant_checkout'
                  onClick={this.handleInstanCheckout}>
                  Bayar Instan
                </Checkbox>
              </div>

              <Button className={classNames('btn--orange', 'btn--block')}
                buttonType='submit'
                disabled={this.state.disabledButton}>
                {this.state.textButton}
              </Button>

            </form>
          </div>
        </div>
        <DrawerContent title={this.state.selectedOperator.product_text}
          selectedOperator={this.state.selectedOperator}
          productList={this.state.productList}
          productId={this.state.selectedProduct.id}
          handleProuductChange={this.handleProuductChange}
          open={this.state.openDrawer}
          handlePruductDrawer={this.handlePruductDrawer} />
      </div>
    )
  }
}

export default DigitalWidgetView
