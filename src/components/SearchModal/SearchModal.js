import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import TopedAceAPI from '../../lib/api/Search/TopedAceAPI'
import './SearchModal.scss'
import SearchModalResult from './SearchModalResult'

import UserSearchID from '../../lib/utils/UserSearchID'
import { storeUserSearchID } from '../../store/app'

const api = new TopedAceAPI()

class SearchModal extends Component {
  static propTypes = {
    onClose: React.PropTypes.func,
    injectPlaceholder: React.PropTypes.string,
    userSearchID: React.PropTypes.string,
    storeUserSearchID: React.PropTypes.func
  }

  state = {
    hasContent: false,
    selection: [],
    query: ''
  }

  constructor (props) {
    super(props)

    this.clearText = this.clearText.bind(this)
    this.universeSearch = this.universeSearch.bind(this)
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

  universeSearch (event) {
    UserSearchID.initUniqueID()

    let query = event.target.value
    let uid = UserSearchID.getUniqueID(this.props.userSearchID)

    this.props.storeUserSearchID(uid)

    api.universeSearch(query, uid).then(result => {
      let selectionFilter = r => { return r['items'].length > 0 }
      let selection = result['data'].filter(selectionFilter)

      this.setState({
        selection: selection.filter(s => s['name'].toLowerCase() !== 'autocomplete')
      })
    }).catch(function (reason) {
      this.setState({ selection: [] })
    })

    this.setState({
      hasContent: query !== '',
      query: query
    })
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
              onChange={this.universeSearch}
              value={this.state.query} />
            <span className='search-input__icon' />

            { this.state.hasContent && <span className='search-input__clear'
              onClick={this.clearText} /> }
            <span className='search-input__close' onClick={this.props.onClose}>Cancel</span>
          </form>
        </div>

        <SearchModalResult items={this.state.selection} />
      </div>
    )
  }
}

const mapDispatchToProps = { storeUserSearchID }
const mapStateToProps = (state) => {
  return {
    userSearchID: state['app'] ? state['app'].user.searchID : state.user.searchID
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal)
