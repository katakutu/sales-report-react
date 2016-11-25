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
      <Panel injectClassName='u-clearfix search-modal__result-empty'>
        Belum ada hasil.
      </Panel>
    )

    return result.length <= 0 ? emptyResult
         : result.map((selection, sIndex) => {
           return (
             <Panel injectClassName='u-clearfix search-modal__result-container' key={`sr-${sIndex}`}>
               { withHeader && <h1>{ this._sentenceCase(selection['name']) }</h1> }
               { selection['items'].map((item, iIndex) => {
                 return (
                   <span className='search-modal__result-item' key={`srl-${iIndex}`}>
                     <Link to={item.url}>{item.keyword}</Link>
                   </span>
                 )
               }) }
             </Panel>
           )
         })
  }

  render () {
    return (
      <Tabs inverse index={this.state.activeTabIndex} onChange={this.handleTabChange}>
        <Tab label='Semua'>

          {/* this.renderResultList(this.props.items) */}

          <Panel injectClassName='u-clearfix search-modal__result-container search-modal__result--recent'>
            <h1>Pencarian Terakhir</h1>
            <a href='#' className='search-modal__result-action'>Hapus Semua</a>
            <ul className='u-list-reset u-p0 u-m0'>
              <li className='search-modal__result-item'>
                <a href='#' className="search-modal__item-action">
                  <span></span>
                </a>
                <Link className='search-modal__item-value' to='#'>iPhone 7 64GB</Link>
              </li>
              <li className='search-modal__result-item'>
                <a href='#' className="search-modal__item-action">
                  <span></span>
                </a>
                <Link className='search-modal__item-value' to='#'>Mini drone quadcore</Link>
              </li>
              <li className='search-modal__result-item'>
                <a href='#' className="search-modal__item-action">
                  <span></span>
                </a>
                <Link className='search-modal__item-value' to='#'>Food pets untuk kucing</Link>
              </li>
              <li className='search-modal__result-item'>
                <a href='#' className="search-modal__item-action">
                  <span></span>
                </a>
                <Link className='search-modal__item-value' to='#'>Sarung shalat bagus</Link>
              </li>
            </ul>
          </Panel>

          <Panel injectClassName='u-clearfix search-modal__result-container search-modal__result--popular'>
            <h1>Pencarian Populer</h1>
            <ul className='u-list-reset u-p0 u-m0'>
              <li className='search-modal__result-item'>
                <Link className='search-modal__item-value' to='#'>Pokemon</Link>
              </li>
              <li className='search-modal__result-item'>
                <Link className='search-modal__item-value' to='#'>Kemeja Flannel</Link>
              </li>
              <li className='search-modal__result-item'>
                <Link className='search-modal__item-value' to='#'>Alat DJ</Link>
              </li>
              <li className='search-modal__result-item'>
                <Link className='search-modal__item-value' to='#'>Topeng Gulat</Link>
              </li>
            </ul>
          </Panel>

        </Tab>
        <Tab label='Hot List'>

          {/* this.renderResultList(this.props.items, 'hotlist', false) */}

          <Panel injectClassName='u-clearfix search-modal__result-empty'>
            Belum ada hasil.
          </Panel>

        </Tab>
        <Tab label='Toko'>

          {/* this.renderResultList(this.props.items, 'shop', false) */}

          <Panel injectClassName='u-clearfix search-modal__result-empty'>
            Belum ada hasil.
          </Panel>

        </Tab>
      </Tabs>
    )
  }
}

export default SearchModalResult
