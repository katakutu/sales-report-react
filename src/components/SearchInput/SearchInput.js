import React from 'react'
import './SearchInput.scss'

export const SearchInput = ({ injectClassName, injectPlaceholder }) => (
  <div className={'search-input' + ' ' + injectClassName}>
    <label htmlFor='search-input__input' 
           style={{'color': '#42b549'}}>Cari produk atau toko</label>
    <input id='search-input__input'
           name='search-input__input'
           type='text' 
           className='search-input__input u-col-12'
           placeholder={injectPlaceholder} />
    <span className='search-input__icon' />
  </div>
)

SearchInput.propTypes = {
  injectClassName: React.PropTypes.string,
  injectPlaceholder: React.PropTypes.string
}

export default SearchInput
