import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { HOSTNAME } from '../../constants'

class SearchInputResultOld extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  _sentenceCase (string) {
    return string.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  _renderItem (name, item, index) {
    return (item, index) => {
      const className = (name.toLowerCase() === 'popular search')
        ? 'autocomplete__item-popular'
        : 'autocomplete__item-image'
      const image = (name.toLowerCase() === 'autocomplete') ? null : (
        <img className={className} src={item.imageURI} />
      )
      const official = (item.official)
        ? (<span className='autocomplete__official-store'>Official Store</span>)
        : null

      return (
        <li key={`it-${index}`}>
          <a href={`${HOSTNAME}${item.url}`}>
            { image }
            <span className='autocomplete__item-text'>{ item.keyword }</span>
            { official }
          </a>
        </li>
      )
    }
  }

  render () {
    return this.props.data.search ? (
      <div id='autocomplete__container'>
        { this.props.data.search.map((selection, sIndex) => {
          return (
            <div className='autocomplete__category' key={`ac-${sIndex}`}>
              <h6>{ this._sentenceCase(selection['name']) }</h6>
              <ul>
                { selection['items'].map(this._renderItem(selection['name'])) }
              </ul>
            </div>
          )
        }) }
      </div>
      ) : null
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
})(SearchInputResultOld)
