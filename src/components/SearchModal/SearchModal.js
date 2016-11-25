import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CryptoJS from 'crypto-js'
import TopedAceAPI from '../../lib/api/Search/TopedAceAPI'
import './SearchModal.scss'
import SearchModalResult from './SearchModalResult'

const api = new TopedAceAPI()

class SearchModal extends Component {
  static propTypes = {
    onClose: React.PropTypes.func
  }

  state = {
    hasContent: false,
    selection: [],
    query: ''
  }

  constructor (props) {
    super(props)

    this.clearText = this.clearText.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.universeSearch = this.universeSearch.bind(this)
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

    if (query === '') {
      this.universeSearch()
    } else {
      api.autocomplete(query).then(result => {
        let acResult = this._autocompleteToUniverseSearchResult(result)

        this.setState({
          selection: acResult
        })
      })
    }

    this.setState({
      hasContent: query !== '',
      query: query
    })
  }

  universeSearch () {
    api.universeSearch('', CryptoJS.MD5(document.cookie)).then(result => {
      let selectionFilter = r => { return r['items'].length > 0 }
      let selection = result['data'].filter(selectionFilter)

      this.setState({
        selection: selection
      })
    })
  }

  _autocompleteToUniverseSearchResult (result) {
    let selection = {}
    result['data'].forEach(data => {
      let name = data['domain']
      if (selection[name]) {
        selection[name].concat({ 'url': data['url'], 'keyword': data['keyword'] })
      } else {
        selection[name] = [{ 'url': data['url'], 'keyword': data['keyword'] }]
      }
    })

    let finalResult = Object.keys(selection).map(key => {
      return { name: key, items: selection[key] }
    })

    return finalResult.filter(r => { return r['items'].length > 0 })
  }

  render () {
    return (
      <div className='modal__container'>
        <div className='search-modal__box'>
          <form className='search-modal__form'>
            <input type='text'
              ref='modalSearchInput'
              className='search-input__input u-col-10'
              placeholder='Cari produk atau toko'
              onFocus={this.universeSearch}
              onChange={this.handleChange}
              value={this.state.query} />
            <span className='search-input__icon' />

            { this.state.hasContent && <span className='search-input__clear'
              onClick={this.clearText}></span> }
            <span className='search-input__close' onClick={this.props.onClose}>Cancel</span>
          </form>
        </div>

        <SearchModalResult items={this.state.selection} />
      </div>
    )
  }
}

export default SearchModal
