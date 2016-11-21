import React from 'react'
import './SearchInput.scss'

export const SearchInput = ({ injectClassName, injectPlaceholder }) => (
  <div className={'search-input' + ' ' + injectClassName}>
    <input type='text' className='search-input__input u-col-12' placeholder={injectPlaceholder} />
    <span className='search-input__icon' />
  </div>
)

SearchInput.propTypes = {
  injectClassName: React.PropTypes.string,
  injectPlaceholder: React.PropTypes.string
}

export default SearchInput
