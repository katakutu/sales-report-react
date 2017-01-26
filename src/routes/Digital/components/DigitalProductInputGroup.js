import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import Autosuggest from 'react-autosuggest'
import './DigitalProductInputGroup.scss'

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

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
  }

  onInputChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  getItems (value) {
    return value.length === 0 ? this.props.items : this.props.items.filter(this.filterSuggestion, value)
  }

  filterSuggestion (item) {
    return item.text.toLowerCase().slice(0, this.length) === this
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
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            alwaysRenderSuggestions
            inputProps={inputProps} />
        </div>
      )
    } else {
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
          <input type='text' className='dp-inputgroup__textbox' placeholder={this.props.placeholder} />
        </div>
      )
    }
  }
}

export default DigitalProductInputGroup
