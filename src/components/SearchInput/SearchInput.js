import React, { Component } from 'react'
import './SearchInput.scss'
import SearchModal from '../SearchModal'

class SearchInput extends Component {
  static propTypes = {
    injectClassName: React.PropTypes.string,
    injectPlaceholder: React.PropTypes.string
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
            style={{ 'color': '#42b549' }}>Cari produk atau toko</label>
        </form>

        { this.state.searchModalOpened && <SearchModal onClose={this.handleModalClosed} /> }
      </div>
    )
  }
}

export default SearchInput
