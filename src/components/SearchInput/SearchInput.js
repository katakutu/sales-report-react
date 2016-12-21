import React, { Component } from 'react'
import { connect } from 'react-redux'
import './SearchInput.scss'
import SearchModal from '../SearchModal'

import lang from '../../lib/utils/Lang'

class SearchInput extends Component {
  static propTypes = {
    injectClassName: React.PropTypes.string,
    injectPlaceholder: React.PropTypes.string,
    updateLang: React.PropTypes.func,
    lang: React.PropTypes.string
  }

  state = {
    searchModalOpened: false
  }

  constructor (props) {
    super(props)

    this.handleFocus = this.handleFocus.bind(this)
    this.handleModalClosed = this.handleModalClosed.bind(this)
  }

  handleFocus () {
    this.setState({ searchModalOpened: true })
  }

  handleModalClosed (event) {
    event.preventDefault()
    this.setState({ searchModalOpened: false })
  }

  render () {
    return (
      <div className={'search-input' + ' ' + this.props.injectClassName}>
        <form>
          <input id='search-input__input'
            name='search-input__input'
            type='text'
            className='search-input__input u-col-12'
            placeholder={this.props.injectPlaceholder}
            onFocus={this.handleFocus} />
          <span className='search-input__icon' />
          <label htmlFor='search-input__input'
            style={{ 'color': '#42b549' }}>{ lang[this.props.lang]['Search Products or Stores'] }</label>
        </form>

        { this.state.searchModalOpened && <SearchModal onClose={this.handleModalClosed} /> }
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}
export default connect(mapStateToProps, undefined)(SearchInput)
