import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import 'whatwg-fetch'
import { HOSTNAME, SITES } from '../../constants'
import lang from '../../lib/utils/Lang'
import GTM from '../../lib/utils/GTM'

import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'

class SearchModalResult extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    lang: React.PropTypes.string,
    userSearchID: React.PropTypes.string,
    query: React.PropTypes.string
  }

  state = {
    activeTabIndex: 0
  }

  _boldKeyword (input, keyword) {
    const regex = new RegExp(keyword, 'ig')
    const splits = input.split(regex) || []
    const matches = input.match(regex) || []

    const key = Math.random().toString(36).substring(4, 3)
    const segments = matches.map((segment, i) => React.DOM.strong({ key: `${segment}-${key}-${i}` }, segment))
    const replacements = splits.map((replacement, index) => {
      return React.DOM.span({ key: `${replacement}-${key}-${index}` }, replacement)
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
          <a className='search-modal__item-value u-truncate'
            href={`${HOSTNAME}${item.url}`}
            onClick={_gtmNotifyClick(item.keyword)}>
            <i className='search-modal__icon' />
            {
              this.props.query === ''
                ? item.keyword
                : this._boldKeyword(item.keyword, this.props.query)
            }
            {
              item['recom'] && item['recom'] !== '' &&
              <div className='search-modal__result-in-category'>
                { lang[this.props.lang]['in'] } { item['recom'] }
              </div>
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
            { item.official && <span className='search-modal__item-label' /> }
            { item.promoted && <span className='search-modal__item-label' /> }
            <hr className='search-modal__shop-name-line' />
            <i className='search-modal__icon' />
            <span className='search-modal__keyword-result u-truncate'>
              {
                this.props.query === ''
                ? item.keyword
                : this._boldKeyword(item.keyword, this.props.query)
              }
            </span>
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

    const mainClassName = `u-clearfix u-mb1 search-modal__result-container search-modal__result--${filter}`
    const title = this._sentenceCase(filter.split('_').join(' '))
    const finalTitle = title === 'Recent Search' ? 'History' : title

    const resultData = filter === '' ? finalData : finalData.filter(filterFunc)

    return resultData.length <= 0
      ? null
      : resultData.map((result, index) => {
        const key = `search-result-${filter}-${index}`

        let resultItems = null
        const maxTaken = 5
        const items = result['items'].slice(0, maxTaken)
        if (filter === 'shop') {
          resultItems = this._renderShopResult(items, key)
        } else if (filter === 'recent_search') {
          resultItems = this._renderRecentSearch(items, key)
        } else if (filter === 'autocomplete') {
          const inCategory = finalData.filter(i => i['id'].toLowerCase() === 'in_category')
          const topInCategory = inCategory.map(r => r.items.slice(0, 3) || []) || []
          const finalItems = topInCategory[0].concat(items)

          resultItems = this._renderResultItems(finalItems, key, filter)
        } else {
          resultItems = this._renderResultItems(items, key, filter)
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

  _handleTabChange (index) {
    this.setState({ activeTabIndex: index })
  }

  constructor (props) {
    super(props)

    this._deleteAllHistory = this._deleteAllHistory.bind(this)
    this._handleTabChange = this._handleTabChange.bind(this)
  }

  render () {
    return (
      <Tabs
        arrowOff
        className='clearfix'
        id='search-tab'
        inverse
        index={this.state.activeTabIndex}
        onChange={this._handleTabChange}>
        <Tab isActive={this.state.activeTabIndex === 0} label='Produk'>
          { this.props.query === '' && this._renderResultList(this.props.data.search, 'recent_search', true) }
          { this.props.query === '' && this._renderResultList(this.props.data.search, 'popular_search', true) }
          { this.props.query !== '' && this._renderResultList(this.props.data.search, 'autocomplete', false) }
        </Tab>
        <Tab isActive={this.state.activeTabIndex === 1} label='Toko'>
          { this._renderResultList(this.props.data.search, 'shop', true) }
        </Tab>
        <Tab isActive={this.state.activeTabIndex === 2} label='Hotlist'>
          { this.props.query !== '' && this._renderResultList(this.props.data.search, 'hotlist', false) }
        </Tab>
      </Tabs>
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
      recom
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

