import React, { Component } from 'react'
import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'
import { Link } from 'react-router'

class SearchModalResult extends Component {
  static propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object)
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
    let result = filter === '' ? items : items.filter(i => i['name'] === filter)
    let emptyResult = (
      <div className='material__card modal__search-result-empty'>
        Belum ada hasil.
      </div>
    )

    return result.length <= 0 ? emptyResult
         : result.map((selection, sIndex) => {
           return (
             <div className='material__card modal__search-result' key={`sr-${sIndex}`}>
               { withHeader && <h1>{ this._sentenceCase(selection['name']) }</h1> }
               { selection['items'].map((item, iIndex) => {
                 return (
                   <span className='modal__search-result-item' key={`srl-${iIndex}`}>
                     <Link to={item.url}>{item.keyword}</Link>
                   </span>
                 )
               }) }
             </div>
           )
         })
  }

  render () {
    return (
      <Tabs inverse index={this.state.activeTabIndex} onChange={this.handleTabChange}>
        <Tab label='Semua'>
          { this.renderResultList(this.props.items) }
        </Tab>
        <Tab label='Hot List'>
          { this.renderResultList(this.props.items, 'hotlist', false) }
        </Tab>
      </Tabs>
    )
  }
}

export default SearchModalResult
