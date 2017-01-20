import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import 'whatwg-fetch'
import { HOSTNAME, SITES } from '../../constants'
import lang from '../../lib/utils/Lang'
import GTM from '../../lib/utils/GTM'

class SearchModalResult extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string,
    userSearchID: React.PropTypes.string,
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

  _itemType (filter) {
    let result = 'Search Autocomplete'
    switch (filter) {
      case 'popular_search':
        result = 'Popular Search'
        break
      case 'hotlist':
        result = 'Search Hotlist'
        break
      default:
        result = 'Search Autocomplete'
    }

    return result
  }

  _renderResultItems (items, key, itemType) {
    const _gtmNotifyClick = (keyword) => {
      return (event) => {
        GTM.pushEvent('clickSearch', 'Search', this._itemType(itemType), keyword)
      }
    }

    return items.map((item, index) => {
      return (
        <li className='search-modal__result-item' key={`search-result-list-${key}-${index}`}>
          <a href='#' className='search-modal__item-action'><span /></a>
          <a className='search-modal__item-value'
            href={`${HOSTNAME}${item.url}`}
            onClick={_gtmNotifyClick(item.keyword)}>
            <i className='search-modal__icon' />
            {
                  this.props.query === ''
                    ? item.keyword
                    : this._boldKeyword(item.keyword, this.props.query)
                }
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
            {
                this.props.query === ''
                ? item.keyword
                : this._boldKeyword(item.keyword, this.props.query)
              }
            { item.official && <span className='search-modal__item-label'>Official Store</span> }
            { item.promoted && <span className='search-modal__item-label'>Promoted</span> }
          </a>
        </li>
      )
    })
  }

  _deleteKeywordFunction (keyword) {
    return (event) => {
      const uid = this.props.userSearchID
      const url = `${SITES.Ace}/universe/v2?q=${keyword}&unique_id=${uid}`

      fetch(url, { method: 'DELETE', credentials: 'same-origin' })
        .then(response => {
          if (response.status === 204) {
            this.props.data.refetch()
          }
        })
    }
  }

  _renderRecentSearch (items, key) {
    const _gtmNotifyClick = (keyword) => {
      return (event) => {
        GTM.pushEvent('clickSearch', 'Search', 'Recent Search', keyword)
      }
    }

    return items.map((item, index) => {
      return (
        <li className='search-modal__result-item' key={`search-result-list-${key}-${index}`}>
          <a onClick={this._deleteKeywordFunction(item.keyword)} className='search-modal__item-action'>
            <span />
          </a>
          <a className='search-modal__item-value'
            href={`${HOSTNAME}${item.url}`}
            onClick={_gtmNotifyClick(item.keyword)}>
            <i className='search-modal__icon' />
            {
                this.props.query === ''
                ? item.keyword
                : this._boldKeyword(item.keyword, this.props.query)
              }
          </a>
        </li>
      )
    })
  }

  _deleteAllHistory (event) {
    const uid = this.props.userSearchID
    const url = `${SITES.Ace}/universe/v2?q=0&unique_id=${uid}&clear_all=true`
    fetch(url, { method: 'DELETE', credentials: 'same-origin' })
      .then(response => {
        if (response.status === 204) {
          this.props.data.refetch()
        }
      })
  }

  _renderResultList (data, filter = '', withHeader = true) {
    const finalData = data || []
    const filterFunc = i => i['id'].toLowerCase() === filter.toLowerCase()

    const mainClassName = `u-clearfix search-modal__result-container search-modal__result--${filter}`
    const title = this._sentenceCase(filter.split('_').join(' '))
    const finalTitle = title === 'Recent Search' ? 'History' : title

    const resultData = filter === '' ? finalData : finalData.filter(filterFunc)

    return resultData.length <= 0
      ? null
      : resultData.map((result, index) => {
        const key = `search-result-${filter}-${index}`

        let resultItems = null
        if (filter === 'shop') {
          resultItems = this._renderShopResult(result['items'], key)
        } else if (filter === 'recent_search') {
          resultItems = this._renderRecentSearch(result['items'], key)
        } else {
          resultItems = this._renderResultItems(result['items'], key, filter)
        }

        return (
          <div className={mainClassName} key={key}>
            { withHeader && <h1 className='u-uppercase'>{ finalTitle }</h1> }
            {
              finalTitle === 'History' &&
                <a onClick={this._deleteAllHistory} className='search-modal__clear-history'>
                  { lang[this.props.lang]['Hapus Semua'] }
                </a>
            }
            <ul className='u-list-reset u-p0 u-m0'>
              { resultItems }
            </ul>
          </div>
        )
      })
  }

  constructor (props) {
    super(props)

    this._deleteAllHistory = this._deleteAllHistory.bind(this)
  }

  render () {
    const data = this.props.data.search || []
    if (data.length === 0) {
      GTM.pushEvent('noSearchResult', 'No Search Result', 'No Result', this.props.query)
    }

    return (
      <div className='clearfix'>
        { this.props.query === '' && this._renderResultList(this.props.data.search, 'recent_search', true) }
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
      promoted
    }
  }
}
`

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}

export default graphql(SearchQuery, {
  options: ({ query, userSearchID }) => ({
    variables: { query, userSearchID },
    returnPartialData: true
  })
})(connect(mapStateToProps, undefined)(SearchModalResult))

