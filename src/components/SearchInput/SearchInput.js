import React, { Component } from 'react'
import CryptoJS from 'crypto-js'
import './SearchInput.scss'
import TopedAceAPI from '../../lib/api/Search/TopedAceAPI'

const api = new TopedAceAPI()

class SearchInput extends Component {
  static propTypes = {
    injectClassName: React.PropTypes.string,
    injectPlaceholder: React.PropTypes.string
  }

  constructor (props) {
    super(props)

    this.universeSearch = this.universeSearch.bind(this)
    this.autocomplete = this.autocomplete.bind(this)

    this.state = {
      showSelection: false,
      selection: [],
      value: ''
    }
  }

  universeSearch () {
    api.universeSearch('', CryptoJS.MD5(document.cookie)).then(result => {
      let selection = result['data'].filter(r => { return r['items'].length > 0 })

      this.setState({
        showSelection: true,
        selection: selection,
        value: ''
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

  autocomplete (event) {
    let value = event.target.value

    if (value === '') {
      this.universeSearch()
    } else {
      api.autocomplete(value).then(result => {
        let selection = this._autocompleteToUniverseSearchResult(result)

        this.setState({
          showSelection: true,
          selection: selection,
          value: value
        })
      })
    }
  }

  _sentenceCase (string) {
    return string.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  render () {
    let autocomplete = this.state.showSelection ? (
      <div id='autocomplete__container'>
        { this.state.selection.map((selection, sIndex) => {
          return (
            <div className='autocomplete__category' key={`ac-${sIndex}`}>
              <h6>{ this._sentenceCase(selection['name']) }</h6>
              <ul>
                { selection['items'].map((item, iIndex) => {
                  return (<li key={`it-${iIndex}`}><a href={item.url}>{ item.keyword }</a></li>)
                }) }
              </ul>
            </div>
          )
        }) }
      </div>
    ) : null

    return (
      <div className={'search-input' + ' ' + this.props.injectClassName}>
        <form>
          <input type='text'
            className='search-input__input u-col-12'
            placeholder={this.props.injectPlaceholder}
            onFocus={this.universeSearch}
            onChange={this.autocomplete}
            value={this.state.value} />
          <span className='search-input__icon' />
        </form>
        { autocomplete }
      </div>
    )
  }
}

export default SearchInput
