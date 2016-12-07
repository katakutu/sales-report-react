import React, { Component } from 'react'
import { connect } from 'react-redux'
import BodyClassName from 'react-body-classname'
import './SearchInputOld.scss'
import TopedAceAPI from '../../lib/api/Search/TopedAceAPI'

import UserSearchID from '../../lib/utils/UserSearchID'
import { storeUserSearchID } from '../../store/app'

import { HOSTNAME } from '../../constants'

const api = new TopedAceAPI()

class SearchInputOld extends Component {
  static propTypes = {
    injectClassName: React.PropTypes.string,
    injectPlaceholder: React.PropTypes.string,
    userSearchID: React.PropTypes.string,
    showModal: React.PropTypes.bool,
    storeUserSearchID: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.autocomplete = this.autocomplete.bind(this)
    this.clearText = this.clearText.bind(this)
    this.closeSearchModal = this.closeSearchModal.bind(this)
    this.state = {
      showSelection: this.props.showModal,
      selection: [],
      value: ''
    }
  }

  clearText (event) {
    this.setState({ value: '' }, () => {
      this.refs.searchInput.focus()
    })
  }

  closeSearchModal (event) {
    this.setState({ showSelection: false })
  }

  autocomplete (event) {
    UserSearchID.initUniqueID()

    let value = event.target.value
    let uid = UserSearchID.getUniqueID(this.props.userSearchID)

    this.props.storeUserSearchID(uid)

    api.universeSearch(value, uid).then(result => {
      let selection = result['data'].filter(r => { return r['items'].length > 0 })

      this.setState({
        showSelection: true,
        selection: selection.filter(s => s['name'].toLowerCase() !== 'autocomplete'),
        value: value
      })
    })
  }

  _sentenceCase (string) {
    return string.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  componentDidMount () {
    // Testing purpose only, will be removed on last push
    api.searchCatalog('sample', '', '').then(
      (res) => {
        console.log('catalog search');
        console.log(res);
      });
      
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
                  return (<li key={`it-${iIndex}`}><a href={`${HOSTNAME}${item.url}`}>{ item.keyword }</a></li>)
                }) }
              </ul>
            </div>
          )
        }) }
      </div>
    ) : null

    let backgroundBlur = (this.state.showSelection) ? 'search-input__modal-active' : ''
    let finalClassName = `search-input u-px2 ${this.props.injectClassName} ${backgroundBlur}`
    let searchBtnCN = (this.state.showSelection) ? 'focus' : ''
    let finalSearchBtnCN = `search-input__btn ${searchBtnCN}`

    let resultAutoComplete = (
      <div className={finalClassName}>
        <div className='u-pt0 u-pb1'>
          <form action='#' method='get' className='u-relative'>
            <input type='hidden' name='st' defaultValue='product' />
            <label htmlFor='search_input' className='u-hide'>Search</label>
            <input name='q'
              autoFocus={this.state.showSelection}
              type='search'
              id='search_input'
              ref='searchInput'
              className='search-input__input'
              placeholder={this.props.injectPlaceholder.toUpperCase()}
              onFocus={this.autocomplete}
              onChange={this.autocomplete}
              value={this.state.value} />
            <button className={finalSearchBtnCN}>
              Search
            </button>
            { this.state.value !== '' && <span className='search-input__cancel' onClick={this.clearText} /> }

            {autocomplete}
          </form>

          { this.state.showSelection && <BodyClassName className='u-body-overflow-no-scroll' /> }
        </div>
      </div>
    )
    let finalResult = (this.state.showSelection) ? (
      <div>
        { resultAutoComplete }
        <div id='search-input__modal-background' onClick={this.closeSearchModal} />
      </div>
    ) : resultAutoComplete

    return finalResult
  }
}

const mapDispatchToProps = { storeUserSearchID }
const mapStateToProps = (state) => {
  return {
    userSearchID: state['app'] ? state['app'].user.searchID : state.user.searchID
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputOld)
