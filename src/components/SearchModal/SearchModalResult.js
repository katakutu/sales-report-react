import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'
import { Link } from 'react-router'
import Panel from '../../components/Panel'

class SearchModalResult extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  state = {
    activeTabIndex: 0
  }

  constructor (props) {
    super(props)

    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange (index) {
    this.setState({ activeTabIndex: index })
  }

  _sentenceCase (string) {
    return string.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  renderResultList (items, filter = '', withHeader = true) {
    let finalItems = items || []
    let filterFunc = i => i['name'].toLowerCase() === filter.toLowerCase()
    let result = filter === '' ? finalItems : finalItems.filter(filterFunc)
    let emptyResult = (
      <Panel className='u-clearfix search-modal__result-empty'>
        { withHeader && <h1>{ this._sentenceCase(filter.split('_').join(' ')) }</h1> }
        Belum ada hasil.
      </Panel>
    )

    return result.length <= 0 ? emptyResult
         : result.map((selection, sIndex) => {
           return (
             <Panel className='u-clearfix search-modal__result-container' key={`sr-${sIndex}`}>
               { withHeader && <h1>{ this._sentenceCase(selection['name']) }</h1> }
               <ul className='u-list-reset u-p0 u-m0'>
                 { this.renderResultItems(selection['name'], selection['items']) }
               </ul>
             </Panel>
           )
         })
  }

  renderResultItems (name, items) {
    return items.map((item, iIndex) => {
      const itemClassName = (name.toLowerCase() === 'popular search')
        ? 'autocomplete__item-popular'
        : 'autocomplete__item-image'
      const image = (name.toLowerCase() === 'autocomplete') ? null : (
        <img className={itemClassName} src={item.imageURI} />
      )
      const official = (item.official)
        ? (<span className='autocomplete__official-store'>Official Store</span>)
        : null

      return (
        <li className='search-modal__result-item' key={`srl-${iIndex}`}>
          {image}
          <Link className='search-modal__item-value' to={item.url}>{item.keyword}</Link>
          {official}
        </li>
      )
    })
  }

  renderRecentSearchList (items) {
    let result = items || []
    let filteredResult = result.filter(i => i['name'].toLowerCase() === 'recent_search')
    let emptyResult = (
      <Panel className='u-clearfix search-modal__result-empty'>
        <h1>Recent Search</h1>
        Belum ada hasil.
      </Panel>
    )

    return filteredResult.length <= 0 ? emptyResult
         : filteredResult.map((selection, sIndex) => {
           return (
             <Panel className='u-clearfix search-modal__result-container search-modal__result--recent'
               key={`sr-${sIndex}`}>
               <h1>{ this._sentenceCase(selection['name']) }</h1>
               <ul className='u-list-reset u-p0 u-m0'>
                 { selection['items'].map((item, iIndex) => {
                   return (
                     <li className='search-modal__result-item' key={`srsl-${iIndex}`}>
                       <a href='#' className='search-modal__item-action'><span /></a>
                       <Link className='search-modal__item-value' to={item.url}>{item.keyword}</Link>
                     </li>
                   )
                 }) }
               </ul>
             </Panel>
           )
         })
  }

  render () {
    return (
      <Tabs inverse index={this.state.activeTabIndex} onChange={this.handleTabChange}>
        <Tab label='Semua'>
          { this.renderRecentSearchList(this.props.data.search) }
          { this.renderResultList(this.props.data.search) }
        </Tab>

        <Tab label='Hot List'>
          { this.renderResultList(this.props.data.search, 'hotlist', false) }
        </Tab>

        <Tab label='Toko'>
          { this.renderResultList(this.props.data.search, 'shop', false) }
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
    }
  }
}
`

export default graphql(SearchQuery, {
  options: ({ query, userSearchID }) => ({ variables: { query, userSearchID } })
})(SearchModalResult)

