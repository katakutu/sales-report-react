import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import queries from './../../../queries'
import gql from 'graphql-tag'
import loading from '../../../static/media/images/lite-loading.png'
import TextHeader from '../../../components/TextHeader'
import ModuleSpinner from './../../../components/Loading/ModuleSpinner'
import ArrayHelper from '../../../lib/utils/ArrayHelper'


class Feed extends Component {

	static propTypes = {
		data: PropTypes.object,
		lang: PropTypes.string,
		ob: PropTypes.number, 
		start: PropTypes.number,
		rows: PropTypes.number,
		shopId: PropTypes.string,
		uniquiedId: PropTypes.string,
		userID: PropTypes.number,
		feeds: PropTypes.arrayOf(PropTypes.object)
	}

	state = {
		feeds: []
	}

	__renderFeed(feeds, parentindex){
		return feeds.map((item, index) => {
			const badges = item.badges  || []
			const labels = item.labels || []

			return(
			<li key={`feed-${index}`}>
				<div className='product-list-wrapper'>
					<figure>
						<a aria-hidden='true' tabIndex='-1' href={ item.url } className='relative'>
						<img src={ item.image_url} className='' alt={ `gambar ${item.name}` } />
						</a>
					</figure>
					<div className='product-list-desc'>
						<a aria-hidden='true' tabIndex='-1' href={ item.url } className=''>
							<span className='product-list-name pl-5 u-truncate'> { item.name } </span>
						</a>
						<div className='product-list-price'> { item.price } </div>
						<div className='product-list-bedge plr-5'> 
							{
								labels.map((label, li) => {
									let style = { backgrundColor: label['color'] }
									if (label['color'] === '#ffffff') {
										style = Object.assign(style, {
											border: '1px solid #bbb',
											color: '#606060'
										})
									}
									return (
										<span
											className='feed__label'
											key={`feed-${index}-label-${li}`}
											style={style}>
											{ label['title'] }
										</span>
									)
								})
							}
							{
								labels.length === 0 &&
								<span className='feed__label' style={{ backgroundColor: '#ffffff' }}>&nbsp;</span>
							}
						</div>
						<div className='clearfix'></div>
						<div className='product-list-shop'>
							<div>
								<span className='ellipsis'>
									<a href='#' className='feed__shop-name u-truncate'>{ item.shop.name }</a>
								</span>
							</div>
							<div className='row-fluid'>
								<span className='product-shop-location font-grey pull-left ellipsis'>
									<i className='mi-icon mi-location'></i>
									{ item.shop.location }
								</span>
								<span className='product-shop-bedges pr-0 pull-right'>
									{
										badges.map((badge, bi) => {
											return (
												<img
													alt={ badge['title']}
													title={ badge['title'] }
													className='cursor-default inline-block va-middle space-badge'
													key={`feed-${index}-badge-${bi}`}
													src={ badge['image_url'] }
													width='19'
													height='19' />
											)
										})
									}
								</span>
							</div>
						</div>
					</div>
				</div>
			</li>
		)
		})
	}

    render() {	
		if (this.props.data.loading) {
		return (
			<div></div>
			)
		}

		const feeds = this.props.data && this.props.data['get_feed'] ? this.props.data['get_feed']['items'] : []
        return (
			<div className='u-clearfix feed-section'>
				<div className='row-fluid'>
					<TextHeader textType={2}>
						{ this.props.title  }
					</TextHeader>
					<ul className='product-list-container pl-5 pr-5'>
						{ feeds.length === 0 && !this.props.data.loading }
						{ feeds.length > 0 && ArrayHelper.chunk(feeds, 2).map((feed, index) => {
						const key = `feed-cont-${index}`
						return (
							<div className='row-fluid' key={key}>
								{ this.__renderFeed(feed, index)}
							</div>
						)
						})}
					</ul>
				</div>
			</div>
        )
    }
}

// export default Feed

const mapStateToProps = (state) => {
  return {
    lang: state['app'] ? state['app'].lang : state.lang
  }
}

export default graphql(queries.FeedQuery, {
  options: ({ ob, start, rows, shopId, uniquiedId }) =>({
	  variable: { ob, start, rows, shopId, uniquiedId },
	  foreachfetch: true,
	  returnPartialData: true })
})(connect(mapStateToProps, undefined)(Feed))