import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import Autosuggest from 'react-autosuggest'
import './DigitalProductInputGroup.scss'
import LogoSimpati from '../assets/operator/simpati.png'

class DigitalProductInputGroup extends Component {

  static propTypes = {
    useAutoSuggest: PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    tooltip: PropTypes.string,
    items: PropTypes.array
  }

  constructor (props) {
    super(props)

    this.state = {
      value: '',
      items: this.props.items
    }
  }

  onInputChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  getItems (value) {
    return value.length === 0 ? this.props.items : this.state.items.filter(this.filterSuggestion(value))
  }

  filterSuggestion (value) {
    return this.text.toLowerCase().slice(0, value.length) === value
  }

  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      items: this.getItems(value)
    })
  }

  onSuggestionsClearRequested () {
    this.setState({
      items: []
    })
  }

  getSuggestionValue (suggestion) {
    return suggestion.text
  }

  renderSuggestion (suggestion) {
    <div>
      {suggestion.text}
    </div>
  }

  render () {
    if (this.props.useAutoSuggest) {
      const inputProps = {
        placeholder: this.props.placeholder,
        value: this.state.value,
        onChange: this.onInputChange
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
            onSuggestionsFetchRequested={() => this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={() => this.onSuggestionsClearRequested}
            getSuggestionValue={() => this.getSuggestionValue}
            renderSuggestion={() => this.renderSuggestion}
            inputProps={inputProps}
          />
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
          <i className='dp-inputgroup__close'>×</i>
        </div>
      )
    }
  }
}

export default DigitalProductInputGroup
