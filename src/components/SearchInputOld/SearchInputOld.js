import React, { Component } from 'react'
import { connect } from 'react-redux'
import BodyClassName from 'react-body-classname'
import SearchInputResultOld from './SearchInputResultOld'
import './SearchInputOld.scss'

import UserSearchID from '../../lib/utils/UserSearchID'
import { storeUserSearchID } from '../../store/app'

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

    this.setState({
      showSelection: true,
      value: value
    })
  }

  componentDidMount () {

  }

  render () {
    let autocomplete = this.state.showSelection ? (
      <SearchInputResultOld
        query={this.state.value}
        userSearchID={this.props.userSearchID} />
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
              autoComplete='off'
              autoFocus={this.state.showSelection}
              type='search'
              id='search_input'
              ref='searchInput'
              className='search-input__input'
              placeholder={this.props.injectPlaceholder}
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
