import React, { Component } from 'react'
import './Toppicks.scss'
import TextHeader from '../../components/TextHeader'
import ArrayHelper from '../../lib/utils/ArrayHelper'

class Toppicks extends Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  constructor (props) {
    super(props)

    this.renderTopPickItem = this.renderTopPickItem.bind(this)
    this.renderTopPickList = this.renderTopPickList.bind(this)
  }

  renderTopPickItem (toppick, parentIndex) {
    return toppick.map((tp, index) => {
      const tName = tp['name'].toLowerCase().replace(' ', '-')
      const key = `${tName}-${parentIndex}-${index}`

      return (
        <div className='u-col u-col-6 toppicks__box' key={key}>
          <a href={tp['url']}>
            <div className='toppicks__banner'>
              <img src={tp['image_url']} alt={tp['name']} className='toppicks__img' />
            </div>
          </a>
        </div>
      )
    })
  }

  renderTopPickList () {
    return this.props.data.map((data, dataIndex) => {
      const name = data['name'].toLowerCase().replace(' ', '-')
      const key = `${name}-container-${dataIndex}`

      return (
        <div className='u-clearfix' key={key}>
          <TextHeader textType={2} injectClassName='toppicks__title'>
            { data['name'] }
          </TextHeader>
          <div className='u-clearfix toppicks-container'>
            <div className='toppicks__contents'>
              {
                ArrayHelper.chunk(data.item, 2).map((toppick, index) => {
                  const name = data['name'].toLowerCase().replace(' ', '-')
                  const key = `${name}-${2 * index}`

                  return (
                    <div className='toppicks__row u-clearfix' key={key}>
                      {this.renderTopPickItem(toppick, index)}
                    </div>
                  )
                })
              }

              <div className='toppicks__see-all u-clearfix'>
                <a className='toppicks__see-all-link' href='#'>
                  Lihat Semua <i className='promo-spacer__icon promo-spacer__icon--arrow' />
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

export default Toppicks
