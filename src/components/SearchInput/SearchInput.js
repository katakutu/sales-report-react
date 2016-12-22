import React, { Component } from 'react'
import BodyClassName from 'react-body-classname'
import { connect } from 'react-redux'
import SearchModal from '../SearchModal'
import './SearchInput.scss'

import lang from '../../lib/utils/Lang'
import UserSearchID from '../../lib/utils/UserSearchID'
import { storeUserSearchID } from '../../store/app'

class SearchInput extends Component {
  static propTypes = {
    injectClassName: React.PropTypes.string,
    injectPlaceholder: React.PropTypes.string,
    lang: React.PropTypes.string,
    showModal: React.PropTypes.bool,
    storeUserSearchID: React.PropTypes.func,
    userSearchID: React.PropTypes.string,
    updateLang: React.PropTypes.func
  }

  state = {
    searchModalOpened: this.props.showModal,
    value: ''
  }

  constructor (props) {
    super(props)

    this.handleFocus = this.handleFocus.bind(this)
    this.handleModalClosed = this.handleModalClosed.bind(this)
  }

  handleFocus () {
    UserSearchID.initUniqueID()
    let uid = UserSearchID.getUniqueID(this.props.userSearchID)

    this.props.storeUserSearchID(uid)

    this.setState({ searchModalOpened: true })
  }

  handleModalClosed (event) {
    event.preventDefault()
    this.setState({ searchModalOpened: false })
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
            value={this.state.value} />
          <button className={finalSearchBtnCN}>
              Search
            </button>

          { this.state.value !== '' && <span className='search-input__cancel' onClick={this.clearText} /> }
        </form>

        { this.state.searchModalOpened && <SearchModal onClose={this.handleModalClosed} /> }
        { this.state.searchModalOpened && <BodyClassName className='u-body-overflow-no-scroll' /> }
      </div>
    )
  }
}

const mapDispatchToProps = { storeUserSearchID }
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang,
    userSearchID: state['app'] ? state['app'].user.searchID : state.user.searchID
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)
