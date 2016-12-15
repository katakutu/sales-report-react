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

  render () {
    return this.props.data.search ? (
      <div id='autocomplete__container'>
        { this.props.data.search.map((selection, sIndex) => {
          return (
            <div className='autocomplete__category' key={`ac-${sIndex}`}>
              <h6>{ this._sentenceCase(selection['name']) }</h6>
              <ul>
                { selection['items'].map((item, iIndex) => {
                  return (<li key={`it-${iIndex}`}><a href={`${HOSTNAME}${item.url}`}>{ item.keyword }</a></li>)
                }) }
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
    }
  }
}
`

export default graphql(SearchQuery, {
  options: ({ query, userSearchID }) => ({ variables: { query, userSearchID } })
})(SearchInputResultOld)
