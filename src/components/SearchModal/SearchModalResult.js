import React, { Component } from 'react'
import Tabs from '../Tabs/Tabs'
import Tab from '../Tabs/Tab'
import { Link } from 'react-router'

class SearchModalResult extends Component {
  static propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.object),
    hotlist: React.PropTypes.arrayOf(React.PropTypes.object)
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

  render () {
    let result = this.props.items.length <= 0 ? <p>Belum ada hasil</p> : (
      <Tabs inverse index={this.state.activeTabIndex} onChange={this.handleTabChange}>
        <Tab label='Semua'>
          { this.props.items.map((selection, sIndex) => {
            return (
              <div className='' key={`sr-${sIndex}`}>
                <h6>{ this._sentenceCase(selection['name']) }</h6>

                { selection['items'].map((item, iIndex) => {
                  return (
                    <p>
                      <Link to={item.url}>{ item.keyword }</Link>
                    </p>
                  )
                }) }
              </div>
            )
          }) }
        </Tab>
        <Tab label='Hot List'>
          { this.props.hotlist.map((selection, sIndex) => {
            return (
              <div className='' key={`sr-${sIndex}`}>
                { selection['items'].map((item, iIndex) => {
                  return (
                    <p>
                      <Link to={item.url}>{ item.keyword }</Link>
                    </p>
                  )
                }) }
              </div>
            )
          }) }
        </Tab>
      </Tabs>
        )

    return result
  }
}

export default SearchModalResult
