import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import Autosuggest from 'react-autosuggest'
import './InputGroup.scss'
import LogoSimpati from '../../assets/operator/simpati.png'

class InputGroup extends Component {

  static propTypes = {
    useAutoSuggest: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    tooltip: PropTypes.string,
    value: PropTypes.string,
    items: PropTypes.array
  }

  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value || '',
      items: this.props.items,
      showAll: true
    }

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }

  onInputChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      showAll: false
    })
  }

  getItems (value) {
    console.log('showAll = ' + this.state.showAll)
    if (this.state.showAll) {
      return this.props.items
    } else {
      return value.length === 0 ? this.props.items : this.props.items.filter(this.filterSuggestion, value)
    }
  }

  filterSuggestion (item) {
    return item.text.toLowerCase().slice(0, this.length) === this.toLowerCase()
  }

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      items: this.getItems(value)
    })
  }

  onSuggestionsClearRequested () {
    this.setState({
      items: this.props.items
    })
  }

  onSuggestionSelected (e) {
    e.target.blur()
    this.setState({
      showAll: true
    })
  }

  shouldRenderSuggestions () {
    return true
  }

  getSuggestionValue (suggestion) {
    return suggestion.text
  }

  renderSuggestion (suggestion) {
    return (
      <div>
        {suggestion.text}
      </div>
    )
  }

  render () {
    if (this.props.useAutoSuggest) {
      const inputProps = {
        placeholder: this.props.placeholder,
        value: this.state.value,
        onChange: this.onInputChange,
        className: 'dp-inputgroup__textbox dp-inputgroup__textbox--compact'
      }

      return (
        <div className='dp-inputgroup'>
          <label className='dp-inputgroup__label u-mb1'>{this.props.label}</label>
          <div className={classNames('dp-inputgroup__tooltip', { 'u-hide': !this.props.tooltip })}>
            <i className='dp-tooltip' />
            <div className='dp-tooltip__container'>
              <div className='dp-tooltip__box'>
                <p className='dp-tooltip__text u-my0'>
                  {this.props.tooltip}
                </p>
              </div>
            </div>
          </div>
          <Autosuggest
            suggestions={this.state.items}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            shouldRenderSuggestions={this.shouldRenderSuggestions}
            focusInputOnSuggestionClick={false}
            inputProps={inputProps} />
        </div>
      )
    } else {
      return (
        <div className='dp-inputgroup u-relative'>
          <label className='dp-inputgroup__label u-mb1'>{this.props.label}</label>
          <div className={classNames('dp-inputgroup__tooltip', { 'u-hide': !this.props.tooltip })}>
            <i className='dp-tooltip' />
            <div className='dp-tooltip__container'>
              <div className='dp-tooltip__box'>
                <p className='dp-tooltip__text u-my0'>
                  {this.props.tooltip}
                </p>
              </div>
            </div>
          </div>
          <input type='text' className='dp-inputgroup__textbox' placeholder={this.props.placeholder} />
          <picture>
            <img src={LogoSimpati} alt='Logo Simpati' className='dp-inputgroup__logo' />
          </picture>
          <i className='dp-inputgroup__close'>&times;</i>
          <div className='dp-error__container u-clearfix'>
            <div className='dp-error'>
              Nomor yang Anda masukkan belum didukung saat ini
            </div>
          </div>
        </div>
      )
    }
  }
}

export default InputGroup
