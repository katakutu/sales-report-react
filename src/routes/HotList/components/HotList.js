import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Img from 'react-image-fallback'

import GTM from '../../../lib/utils/GTM'

class HotList extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  state = {
    hotlists: []
  }

  constructor (props) {
    super(props)

    this._gtmNotifyItemClicked = this._gtmNotifyItemClicked.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps['data'] && !nextProps.data.loading) {
      // only add new urls that's not already there
      const urls = this.state.hotlists.map(h => h['url'])
      const data = nextProps['data']['hot_product_list'] && nextProps['data']['hot_product_list']['items']
      const gqlData = data || []
      const newData = gqlData.filter(data => {
        return urls.length === 0 ? true : !urls.includes(data['url'])
      })

      this.setState({
        hotlists: this.state.hotlists.concat(newData)
      })
    }
  }

  _gtmNotifyItemClicked (item) {
    return (event) => {
      GTM.pushEvent('clickHotlist', 'Hotlist', 'Click', item.title)
    }
  }

  render () {
    return (
      <div>
        {
          this.state.hotlists.map((item, index) => {
            return (
              <div className='hotlist__item' onClick={this._gtmNotifyItemClicked(item)} key={`hotlist-${index}`}>
                <div className='hotlist__wrapper'>
                  <a aria-hidden='true' tabIndex='-1' href={item.url} className='hotlist__click u-block' />
                  <Img src={item.image_url}
                    initialImage={'https://ecs7.tokopedia.net/img/mobile/default-img-prod.jpg'}
                    fallbackImage={'https://ecs7.tokopedia.net/img/mobile/default-img-prod.jpg'}
                    className='u-fit u-block u-mx-auto'
                    width='375' height='375'
                    alt={`${item.title} image`} />
                  <div className='hotlist__footer u-clearfix u-mt1'>
                    <div className='u-clearfix'>
                      <div className='u-col u-col-5 u-truncate u-relative'>
                        <a aria-hidden='true' tabIndex='-1' href='#' className='hotlist__click u-block' />
                        <span className='hotlist__name u-bold'>{item.title}</span>
                      </div>
                      <div className='u-col u-col-7 u-right-align u-relative'>
                        <a aria-hidden='true' tabIndex='-1' href='#' className='hotlist__click u-block' />
                        <small className='hotlist__start-from u-mr1'>Mulai dari:</small>
                        <span className='hotlist__price u-bold'>{item.price_start_from}</span>&nbsp;&rsaquo;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const HotListQuery = gql`
query Query($page: Int!) {
  hot_product_list(page: $page, per_page:9) {
    curr_page
    per_page
    max_page
    items {
      title
      url
      image_url
      price_start_from
    }
  }
}
`

export default graphql(HotListQuery, {
  options: ({ page }) => ({
    variables: { page },
    returnPartialData: true
  })
})(HotList)
