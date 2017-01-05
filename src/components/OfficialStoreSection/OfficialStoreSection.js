import React, { Component } from 'react'
import './OfficialStoreSection.scss'
import TextHeader from '../../components/TextHeader'

class OfficialStoreSection extends Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object)
  }

  renderStore (data, index) {
    return (
      <div className='u-col u-col-3 official-store__item' key={`os-${index}`}>
        <a href={data.url}
          data-value={data.name}
          className='official-store__link u-center'>
          <div className='u-table'>
            <div className='u-table-cell official-store__cell'>
              <img
                src={data.logo_url}
                alt={`${data.name} Logo`}
                className='u-mx-auto u-fit u-block' />
            </div>
          </div>
        </a>
      </div>
    )
  }

  render () {
    return (
      <div className='u-clearfix official-store'>
        <TextHeader textType={1}>
          Official Store
        </TextHeader>
        <div className='official-store__content u-clearfix u-mxn1'>
          { this.props.data.map(this.renderStore) }
        </div>
      </div>
    )
  }
}

export default OfficialStoreSection
