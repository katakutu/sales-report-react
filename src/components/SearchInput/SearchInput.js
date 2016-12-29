import React, { Component } from 'react'
import BodyClassName from 'react-body-classname'
import { connect } from 'react-redux'
import SearchModal from '../SearchModal'
import './SearchInput.scss'

import lang from '../../lib/utils/Lang'
import GTM from '../../lib/utils/GTM'
import UserSearchID from '../../lib/utils/UserSearchID'
import { storeUserSearchID, updateSearchModalStatus } from '../../store/app'

class SearchInput extends Component {
  static propTypes = {
    injectClassName: React.PropTypes.string,
    injectPlaceholder: React.PropTypes.string,
    lang: React.PropTypes.string,
    showModal: React.PropTypes.bool,
    storeUserSearchID: React.PropTypes.func,
    userSearchID: React.PropTypes.string,
    updateLang: React.PropTypes.func,
    updateSearchModalStatus: React.PropTypes.func,
    searchQuery: React.PropTypes.string
  }

  state = {
    searchModalOpened: this.props.showModal
  }

  constructor (props) {
    super(props)

    this.handleFocus = this.handleFocus.bind(this)
    this.handleModalClosed = this.handleModalClosed.bind(this)
    this.handleSearchButtonClicked = this.handleSearchButtonClicked.bind(this)
  }

  handleFocus () {
    UserSearchID.initUniqueID()
    let uid = UserSearchID.getUniqueID(this.props.userSearchID)

    this.props.storeUserSearchID(uid)

    this.setState({ searchModalOpened: true }, () => {
      this.props.updateSearchModalStatus(true)
    })
  }

  handleModalClosed (event) {
    event.preventDefault()
    this.setState({ searchModalOpened: false }, () => {
      this.props.updateSearchModalStatus(false)
    })
  }

  handleSearchButtonClicked (event) {
    GTM.pushEvent('clickSearch', 'Search', 'Search', this.props.searchQuery)
  }

  render () {
    let backgroundBlur = (this.state.showSelection) ? 'search-input__modal-active' : ''
    let finalClassName = `search-input u-px2 u-pb2 ${this.props.injectClassName} ${backgroundBlur}`
    let searchBtnCN = (this.state.showSelection) ? 'focus' : ''
    let finalSearchBtnCN = `search-input__btn ${searchBtnCN}`

    return (
      <div className={finalClassName}>
        <form action='/search' method='get' className='u-relative'>
          <input type='hidden' name='st' defaultValue='product' />
          <label htmlFor='search_input' className='u-hide'>
            { lang[this.props.lang]['Search Products or Stores'] }
          </label>
          <input name='q'
            autoComplete='off'
            autoFocus={this.state.showSelection}
            type='search'
            id='search_input'
            ref='searchInput'
            className='search-input__input'
            placeholder={this.props.injectPlaceholder}
            onFocus={this.handleFocus}
            readOnly
            value={this.props.searchQuery} />
          <button className={finalSearchBtnCN} onClick={this.handleSearchButtonClicked}>
              Search
          </button>
        </form>

        { this.state.searchModalOpened && <SearchModal onClose={this.handleModalClosed} /> }
        { this.state.searchModalOpened && <BodyClassName className='u-body-overflow-no-scroll' /> }
      </div>
    )
  }
}

const mapDispatchToProps = { storeUserSearchID, updateSearchModalStatus }
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    searchQuery: state['app'] ? state['app'].searchQuery : state.searchQuery,
    userSearchID: state['app'] ? state['app'].user.searchID : state.user.searchID
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
