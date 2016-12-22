import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class HotList extends Component {
  static propTypes = {
    data: React.PropTypes.object
  }

  state = {
    hotlists: []
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps['data']) {
      // only add new urls that's not already there
      const urls = this.state.hotlists.map(h => h['url'])
      const newData = nextProps['data']['hot_product_list']['data'].filter(data => {
        return urls.length === 0 ? true : !urls.includes(data['url'])
      })

      this.setState({
        hotlists: this.state.hotlists.concat(newData)
      })
    }
  }

  render () {
    return (
      <div>
        {
          this.state.hotlists.map((item, index) => {
            return (
              <div className='hotlist__item' key={`hotlist-${index}`}>
                <div className='hotlist__wrapper'>
                  <a aria-hidden='true' tabIndex='-1' href={item.url} className='hotlist__click u-block' />
                  <img src={item.image_url} className='u-fit u-block u-mx-auto' alt='' />
                  <div className='hotlist__footer u-clearfix u-mt1'>
                    <div className='u-clearfix'>
                      <div className='u-col u-col-5 u-truncate u-relative'>
                        <a aria-hidden='true' tabIndex='-1' href='#' className='hotlist__click u-block' />
                        <span className='hotlist__name u-bold'>{item.title_enc}</span>
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
    message_status
    success
    data{
      title_enc
      image_url
      url
      price_start_from
    }
  }
}
`

export default graphql(HotListQuery, {
  options: ({ page }) => ({ variables: { page } })
})(HotList)
