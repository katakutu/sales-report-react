import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Link } from 'react-router'
import { HOSTNAME } from '../../constants'

class SearchModalResult extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    query: React.PropTypes.string
  }

  _boldKeyword (input, keyword) {
    const regex = new RegExp(keyword, 'ig')
    const splits = input.split(regex) || []
    const matches = input.match(regex) || []

    const key = Math.random().toString(36).substring(4, 3)
    const segments = matches.map((segment, i) => React.DOM.span({ key: `${segment}-${key}-${i}` }, segment))
    const replacements = splits.map((replacement, index) => {
      return React.DOM.strong({ key: `${replacement}-${key}-${index}` }, replacement)
    })

    const createResult = (arr1, arr2) => {
      return arr1.reduce((result, value, index) => result.concat(value, arr2[index]), [])
                 .filter(s => s)
    }

    const res = (replacements.length > segments.length)
      ? createResult(replacements, segments)
      : createResult(segments, replacements)

    return res
  }

  _sentenceCase (string) {
    return string.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  _renderEmptyResult (title, withHeader, mainClassName) {
    return (
      <div className={mainClassName}>
        {
          withHeader &&
            <h1 className='u-uppercase'>{ title }</h1>
        }

        <ul className='u-list-reset u-p0 u-m0'>
          <li className='search-modal__result-item'>
            <Link className='search-modal__item-value' to='#'>
              <i className='search-modal__icon' />
              Tidak ada hasil pencarian
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  _renderResultItems (items, key) {
    return items.map((item, index) => {
      return (
        <li className='search-modal__result-item' key={`search-result-list-${key}-${index}`}>
          <a href='#' className='search-modal__item-action'><span /></a>
          <a className='search-modal__item-value' href={`${HOSTNAME}${item.url}`}>
            <i className='search-modal__icon' />
            { this._boldKeyword(item.keyword, this.props.query) }
          </a>
        </li>
      )
    })
  }

  _renderShopResult (items, key) {
    return items.map((item, index) => {
      return (
        <li className='search-modal__result-item' key={`search-result-list-${key}-${index}`}>
          <a href='#' className='search-modal__item-action'><span /></a>
          <a className='search-modal__item-value' href={`${HOSTNAME}${item.url}`}>
            <img src={item.imageURI} alt={`${item.keyword} Store Logo`} />
            { this._boldKeyword(item.keyword, this.props.query) }
            { item.official && <span className='search-modal__item-label'>Official Store</span> }
          </a>
        </li>
      )
    })
  }

  _renderResultList (data, filter = '', withHeader = true) {
    const finalData = data || []
    const filterFunc = i => i['id'].toLowerCase() === filter.toLowerCase()

    const mainClassName = `u-clearfix search-modal__result-container search-modal__result--${filter}`
    const title = this._sentenceCase(filter.split('_').join(' '))

    const resultData = filter === '' ? finalData : finalData.filter(filterFunc)

    return resultData.length <= 0
      // ? this._renderEmptyResult(title, withHeader, mainClassName)
      ? null
      : resultData.map((result, index) => {
        const key = `search-result-${filter}-${index}`
        return (
          <div className={mainClassName} key={key}>
            { withHeader && <h1 className='u-uppercase'>{ title }</h1> }
            { title === 'History' && <a className='search-modal__clear-history'>Hapus Semua</a> }
            <ul className='u-list-reset u-p0 u-m0'>
              {
                filter === 'shop'
                  ? this._renderShopResult(result['items'], key)
                  : this._renderResultItems(result['items'], key)
              }
            </ul>
          </div>
        )
      })
  }

  render () {
    return (
      <div className='clearfix'>
        { this.props.query === '' && this._renderResultList(this.props.data.search, 'history', true) }
        { this.props.query === '' && this._renderResultList(this.props.data.search, 'popular_search', true) }
        { this.props.query !== '' && this._renderResultList(this.props.data.search, 'autocomplete', false) }
        { this.props.query !== '' && this._renderResultList(this.props.data.search, 'shop', true) }
        { this.props.query !== '' && this._renderResultList(this.props.data.search, 'hotlist', true) }
      </div>
    )
  }
}

const SearchQuery = gql`
query Query($query: String!, $userSearchID: String!) {
  search(query:$query, userSearchID:$userSearchID){
    id
    name
    items{
      keyword
      url
      imageURI
      official
    }
  }
}
`

export default graphql(SearchQuery, {
  options: ({ query, userSearchID }) => ({
    variables: { query, userSearchID },
    returnPartialData: true
  })
})(SearchModalResult)

