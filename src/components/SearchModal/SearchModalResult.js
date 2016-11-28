import React, { Component } from 'react'
import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'
import { Link } from 'react-router'
import Panel from '../../components/Panel'

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
               { selection['items'].map((item, iIndex) => {
                 return (
                   <li className='search-modal__result-item' key={`srl-${iIndex}`}>
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
          { this.renderResultList(this.props.items, 'recent_search') }
          { this.renderResultList(this.props.items) }
        </Tab>

        <Tab label='Hot List'>
          { this.renderResultList(this.props.items, 'hotlist', false) }
        </Tab>

        <Tab label='Toko'>
          { this.renderResultList(this.props.items, 'shop', false) }
        </Tab>
      </Tabs>
    )
  }
}

export default SearchModalResult
