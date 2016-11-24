import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './SearchModal.scss'

class SearchModal extends Component {
  static propTypes = {
    onClose: React.PropTypes.func
  }

  state = {
    hasContent: false,
    query: ''
  }

  constructor (props) {
    super(props)

    this.clearText = this.clearText.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.modalSearchInput).focus()
  }

  clearText () {
    this.setState({
      hasContent: false,
      query: ''
    })

    ReactDOM.findDOMNode(this.refs.modalSearchInput).focus()
  }

  handleChange (event) {
    let query = event.target.value
    this.setState({
      hasContent: query !== '',
      query: query
    })
  }

  render () {
    return (
      <div className='modal__container'>
        <div className='modal__search-box'>
          <form className='modal__search-form'>
            <span className='search-input__icon' />
            <input type='text'
              ref='modalSearchInput'
              className='search-input__input u-col-10'
              placeholder='Cari produk atau toko'
              onChange={this.handleChange}
              value={this.state.query} />

            { this.state.hasContent && <span className='search-input__clear'
              onClick={this.clearText}>x</span> }
            <span className='search-input__close' onClick={this.props.onClose}>Close</span>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchModal
