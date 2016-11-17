import React from 'react'
import './SearchInput.scss'

export const SearchInput = ({classN, placeH}) => (
  <div className={"search-input" +  " " + classN}>
    <input type="text" className="search-input__input u-col-12" placeholder={placeH}/>
    <span className="search-input__icon"></span>
  </div>
)

export default SearchInput
