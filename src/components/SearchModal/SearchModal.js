import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import SearchModalResult from './SearchModalResult'

import './SearchModal.scss'

class SearchModal extends Component {
  static propTypes = {
    onClose: React.PropTypes.func,
    injectPlaceholder: React.PropTypes.string,
    userSearchID: React.PropTypes.string
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
    }, function () {
      ReactDOM.findDOMNode(this.refs.modalSearchInput).focus()
    })
  }

  handleChange (event) {
    this.setState({ query: event.target.value })
  }

  render () {
    return (
      <div className='modal__container'>
        <div className='search-modal__box'>
          <span className='search-input__close' onClick={this.props.onClose} />
          <form action='/search' method='get' className='search-modal__form'>
            <input type='text'
              name='q'
              ref='modalSearchInput'
              className='search-input__modal-input u-col-10'
              placeholder='Cari Produk atau Toko'
              onChange={this.handleChange}
              value={this.state.query} />
            <input type='hidden' name='st' defaultValue='product' />
            <span className='search-input__modal-icon' />
            <span className='search-input__modal-cancel' onClick={this.clearText} />

            { this.state.hasContent && <span className='search-input__clear'
              onClick={this.clearText} /> }
          </form>
        </div>

        <SearchModalResult query={this.state.query} userSearchID={this.props.userSearchID} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userSearchID: state['app'] ? state['app'].user.searchID : state.user.searchID
  }
}
export default connect(mapStateToProps, null)(SearchModal)
