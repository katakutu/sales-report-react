import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import SearchModalResult from './SearchModalResult'

import './SearchModal.scss'
import { clearSearchQuery, updateSearchQuery } from '../../store/app'
import lang from '../../lib/utils/Lang'

class SearchModal extends Component {
  static propTypes = {
    clearSearchQuery: React.PropTypes.func,
    lang: React.PropTypes.string,
    onClose: React.PropTypes.func,
    injectPlaceholder: React.PropTypes.string,
    updateSearchQuery: React.PropTypes.func,
    userSearchID: React.PropTypes.string,
    searchQuery: React.PropTypes.string
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
    this.props.clearSearchQuery()
    ReactDOM.findDOMNode(this.refs.modalSearchInput).focus()
  }

  handleChange (event) {
    const content = event.target.value
    this.props.updateSearchQuery(content)
  }

  render () {
    return (
      <div className='modal__container'>
        <div className='search-modal__box'>
          <span className='search-input__close' onClick={this.props.onClose} />
          <form action='/search' method='get' className='search-modal__form'>
            <input type='search'
              autoComplete='off'
              name='q'
              id='search_modal_input'
              ref='modalSearchInput'
              className='search-input__modal-input u-col-10'
              placeholder={lang[this.props.lang]['Search Products or Stores']}
              onChange={this.handleChange}
              value={this.props.searchQuery} />
            <input type='hidden' name='st' defaultValue='product' />
            <span className='search-input__modal-icon' />

            { this.props.searchQuery !== '' &&
            <span className='search-input__modal-cancel' onClick={this.clearText} /> }

            { this.props.searchQuery !== '' && <span className='search-input__clear'
              onClick={this.clearText} /> }
          </form>
          <ul className='search-modal__tabs-holder u-clearfix'>
            <li className='search-modal__tabs'>
              <a href="#semua" className="active" aria-controls="semua" role="tab" data-toggle="tab">Semua</a>
            </li>
            <li className='search-modal__tabs'>
              <a href="#toko" aria-controls="toko" role="tab" data-toggle="tab">Toko</a>
            </li>
          </ul>
        </div>

        <SearchModalResult query={this.props.searchQuery} userSearchID={this.props.userSearchID} />
      </div>
    )
  }
}

const mapDispatchToProps = { clearSearchQuery, updateSearchQuery }
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    searchQuery: state['app'] ? state['app'].searchQuery : state.searchQuery,
    userSearchID: state['app'] ? state['app'].user.searchID : state.user.searchID
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)
