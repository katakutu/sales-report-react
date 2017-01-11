import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Toppicks.scss'
import TextHeader from '../../components/TextHeader'
import { DESKTOP_HOSTNAME } from '../../constants'
import lang from '../../lib/utils/Lang'
import GTM from '../../lib/utils/GTM'

class Toppicks extends Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object),
    propLang: React.PropTypes.string
  }

  constructor (props) {
    super(props)

    this._gtmNotifyTopPicksClicked = this._gtmNotifyTopPicksClicked.bind(this)
    this._gtmNotifyToppickHotlistClicked = this._gtmNotifyToppickHotlistClicked.bind(this)
    this.renderFirstTopPickItem = this.renderFirstTopPickItem.bind(this)
    this.renderTopPickItem = this.renderTopPickItem.bind(this)
    this.renderTopPickList = this.renderTopPickList.bind(this)
  }

  _gtmNotifyTopPicksClicked (toppick) {
    return (event) => {
      GTM.pushEvent('clickToppicks', 'Toppicks Home', 'Click', toppick['name'])
    }
  }

  _gtmNotifyToppickHotlistClicked (toppickName, hotlist) {
    return (event) => {
      GTM.pushEvent('clickToppicks', 'Toppicks Home', toppickName, hotlist['name'])
    }
  }

  renderFirstTopPickItem (toppick, parentIndex) {
    return toppick.map((tp, index) => {
      const tName = tp['name'].toLowerCase().replace(' ', '-')
      const key = `${tName}-${parentIndex}-${index}`

      return (
        <div className='u-col u-col-6 toppicks__box' key={key}>
          <a href={tp['url']} onClick={this._gtmNotifyTopPicksClicked(tp)}>
            <div className='toppicks__banner'>
              <img src={tp['image_url']} alt={tp['name']} className='toppicks__img' />
            </div>
          </a>
        </div>
      )
    })
  }

  renderTopPickItem (toppickName, toppick, parentIndex) {
    return toppick.map((tp, index) => {
      const tName = tp['name'].toLowerCase().replace(' ', '-')
      const key = `${tName}-${parentIndex}-${index}`

      return (
        <div className='u-col u-col-6 toppicks__box' key={key}>
          <div className='toppicks__box-content'>
            <a href={tp['url']} onClick={this._gtmNotifyToppickHotlistClicked(toppickName, tp)}>
              <img src={tp['image_url']} alt={tp['name']} className='toppicks__img' />
            </a>
          </div>
        </div>
      )
    })
  }

  _getFirstTopPicks (data) {
    if (!data['toppicks'] || !data['toppicks'][0] || !data['toppicks'][0].item) {
      return { item: [] }
    }

    return data['toppicks'][0]
  }

  renderTopPickList () {
    return this.props.data.map((data, dataIndex) => {
      const name = data['name'].toLowerCase().replace(' ', '-')
      const key = `${name}-container-${dataIndex}`

      const firstToppicks = this._getFirstTopPicks(data)
      const firstRow = firstToppicks.item.slice().splice(0, 1)
      const secondRow = firstToppicks.item.slice().splice(1)

      return (
        <div className='u-clearfix' key={key}>
          <TextHeader textType={2} injectClassName='toppicks__title'>
            { data['name'] }
          </TextHeader>
          <div className='u-clearfix toppicks-container'>
            <div className='toppicks__contents'>
              <div className='toppicks__row u-clearfix'>
                { this.renderFirstTopPickItem([firstToppicks], dataIndex) }
                { this.renderTopPickItem(firstToppicks['name'], firstRow, dataIndex + 1) }
              </div>

              <div className='toppicks__row u-clearfix'>
                { this.renderTopPickItem(firstToppicks['name'], secondRow, dataIndex + 2) }
              </div>

              <div className='toppicks__see-all u-clearfix'>
                <a className='toppicks__see-all-link' href={`${DESKTOP_HOSTNAME}/toppicks/`}>
                  { lang[this.props.propLang]['Lihat Semua'] }
                  <i className='promo-spacer__icon promo-spacer__icon--arrow' />
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className='u-clearfix'>
        { this.renderTopPickList() }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    propLang: state['app'] ? state['app'].lang : state.lang
  }
}
export default connect(mapStateToProps, undefined)(Toppicks)
