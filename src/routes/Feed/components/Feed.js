import React, { Component } from 'react'
import { graphql } from 'react-apollo'




class Feed extends Component {
    render() {
        return (
            <div className="swiper-slide">
			    <div className="product-list-wrapper product-list-wrapper-rvp">
				    <figure>
					    <a className="relative" href="https://m.tokopedia.com/tueven/macbook-pro-md101-13inch-4gb-500gb">
                            <img alt="Macbook Pro MD101 13inch (4GB - 500GB)" className="" data-original="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2017/1/10/984175/984175_32c44848-69fa-4334-b1ad-19efd50533a3" src="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2017/1/10/984175/984175_32c44848-69fa-4334-b1ad-19efd50533a3"/>
                        </a>
					</figure>
					<div className="product-list-desc">
					    <a href="https://m.tokopedia.com/tueven/macbook-pro-md101-13inch-4gb-500gb">
                            <span className="product-list-name pl-5 pr-5 ellipsis">Macbook Pro MD101 13inch (4GB - 500GB)</span>
                        </a>
					    <div className="product-list-price">Rp 7.650.000</div>
                        <div className="product-list-bedges"></div>
						<div className="clearfix"></div>
						<div className="product-list-shop">
						    <div>
							    <span className="ellipsis">
                                    <i className="mi-icon mi-shop pull-left"></i>
                                    <a className="merchant-name ellipsis" href="https://m.tokopedia.com/tueven">Tueven</a>
                                </span>
							</div>
							<div className="row-fluid">
							    <span className="product-shop-location font-grey pull-left ellipsis"><i className="mi-icon mi-location"></i> Tangerang</span>
                                    <span className="product-shop-bedges pr-0 pull-right">
                                        <img src="https://clover.tokopedia.com/badges/merchant/v1?shop_id=984175&amp;t=web"/>
                                    </span>
								</div>
							</div>
						</div>
					</div>
				</div>
        )
    }
}

export default Feed