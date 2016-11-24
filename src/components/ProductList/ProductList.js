import React from 'react'
import './ProductList.scss'

export const ProductList = () => (
  <div className='u-clearfix pd-lr-10 panel-container'>
    <div className='product-list__holder-horizontal u-clearfix'>

      <div className='u-col u-col-6'>
        <div className='product-list__box'>
          <a className='dp-block' href='#'>
            <img className='product-list__img' src='http://placehold.it/250x250' />
          </a>
          <div className='product-list__name-price u-clearfix'>
            <a href='#'>
              <div className='product-list__name'>
                <span className='product-list__text-content'>
                  Tshirt Tony Start Iron Man 3
                  <div className='product-list__ellipsis'>...</div>
                </span>
              </div>
            </a>
            <div className='product-list__price'>Rp. 3.000</div>
          </div>

          <div className='product-list__shop-location'>
            <div className='product-list__shop-name'>Central Jacket Bandung</div>
            <div className='product-list__location'>
              <img className='product-list__icon-location' src='http://placehold.it/15x15' />
              <span className='product-list__location-name ellipsis'>Bandung Bjsjsjsjssjsjhdjdjkdjdjddj djdjdjdj</span>
            </div>
          </div>
        </div>
      </div>

      <div className='u-col u-col-6'>
        <div className='product-list__box'>
          <a className='dp-block' href='#'>
            <img className='product-list__img' src='http://placehold.it/250x250' />
          </a>
          <div className='product-list__name-price u-clearfix'>
            <a href='#'>
              <div className='product-list__name'>
                <div className='product-list__text-content'>
                  Jaket Vans Women Pink Blue Sweater Ansjsksk HAJJsjs ajdajsEND
                  <div className='product-list__multi-ellipsis'>...</div>
                </div>
              </div>
            </a>
            <div className='product-list__price'>Rp. 50.000</div>
            <div className='product-list__rating-count'>
              <img className='product-list__rating' src='http://placehold.it/71x16' />
              <span className='product-list__count-rat'>(1422412)</span>
            </div>
          </div>

          <div className='product-list__shop-location'>
            <div className='product-list__shop-name'>Central Jacket Bandung</div>
            <div className='product-list__location'>
              <img className='product-list__icon-location' src='http://placehold.it/15x15' />
              <span className='product-list__location-name ellipsis'>Bandung Bjsjsjsjssjsjhdjdjkdjdjddj djdjdjdj</span>
            </div>
            <div className='product-list__icon-box'>
              <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
              <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
              <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
            </div>
          </div>
        </div>
      </div>

      <div className='u-clearfix' />
      <a className='product-list__see-all' href='#'>Lihat semua > </a>
    </div>

    <div className='product-list__holder-vertical u-clearfix'>
      <div className='general__header pd-lr-10'>
        Produk dari Toko Favorit
        <div className='general__header-line' />
      </div>

      <div className='product-list__box u-clearfix'>
        <div className='u-col u-col-12'>
          <div className='u-col u-col-4 pd-l-10'>
            <a className='dp-block' href='#'>
              <img className='product-list__img' src='http://placehold.it/50x50' />
            </a>
          </div>
          <div className='u-col u-col-8 pd-lr-10'>
            <div className='product-list__name-price u-clearfix'>
              <div className='product-list__name'>
                <a href='#'>
                  <div className='product-list__text-content'>
                    Jaket Vans Women Pink Blue Sweater Ansjsksk HAJJsjs ajdajsEND
                    <div className='product-list__ellipsis'>...</div>
                  </div>
                </a>
              </div>

              <img className='product-list__icon-wishlist' src='http://placehold.it/20x20' />

              <div className='product-list__price'>Rp. 50.000
                <span className='product-list__cashback'>Cashback 5%</span>
              </div>
              <div className='product-list__rating-count'>
                <img className='product-list__rating' src='http://placehold.it/71x16' />
                <span className='product-list__count-rat'>(1422412)</span>
              </div>
            </div>

            <div className='product-list__shop-location'>
              <div className='product-list__shop-name'>Central Jacket Bandung</div>
              <div className='product-list__location'>
                <img className='product-list__icon-location' src='http://placehold.it/15x15' />
                <span className='product-list__location-name ellipsis'>
                  Bandung Bjsjsjsjssjsjhdjdjkdjdjddj djdjdjdj
                </span>
              </div>
              <div className='product-list__icon-box'>
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='product-list__box u-clearfix'>
        <div className='u-col u-col-12'>
          <div className='u-col u-col-4 pd-l-10'>
            <a className='dp-block' href='#'>
              <img className='product-list__img' src='http://placehold.it/50x50' />
            </a>
          </div>
          <div className='u-col u-col-8 pd-lr-10'>
            <div className='product-list__name-price u-clearfix'>
              <div className='product-list__name'>
                <a href='#'>
                  <div className='product-list__text-content'>
                    Jaket Vans Women Pink Blue Sweater Ansjsksk HAJJsjs ajdajsEND
                    <div className='product-list__ellipsis'>...</div>
                  </div>
                </a>
              </div>

              <img className='product-list__icon-wishlist' src='http://placehold.it/20x20' />

              <div className='product-list__price'>Rp. 50.000</div>
            </div>

            <div className='product-list__shop-location'>
              <div className='product-list__shop-name'>Central Jacket Bandung</div>
              <div className='product-list__location'>
                <img className='product-list__icon-location' src='http://placehold.it/15x15' />
                <span className='product-list__location-name ellipsis'>
                  Bandung Bjsjsjsjssjsjhdjdjkdjdjddj djdjdjdj
                </span>
              </div>
              <div className='product-list__icon-box'>
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='product-list__box u-clearfix'>
        <div className='u-col u-col-12'>
          <div className='u-col u-col-4 pd-l-10'>
            <a className='dp-block' href='#'>
              <img className='product-list__img' src='http://placehold.it/50x50' />
            </a>
          </div>
          <div className='u-col u-col-8 pd-lr-10'>
            <div className='product-list__name-price u-clearfix'>
              <div className='product-list__name'>
                <a href='#'>
                  <div className='product-list__text-content'>
                    Jaket Vans Women Pink Blue Sweater Ansjsksk HAJJsjs ajdajsEND
                    <div className='product-list__ellipsis'>...</div>
                  </div>
                </a>
              </div>

              <img className='product-list__icon-wishlist' src='http://placehold.it/20x20' />

              <div className='product-list__price'>Rp. 50.000
                <span className='product-list__cashback'>Cashback 5%</span>
              </div>
              <div className='product-list__rating-count'>
                <img className='product-list__rating' src='http://placehold.it/71x16' />
                <span className='product-list__count-rat'>(1422412)</span>
              </div>
            </div>

            <div className='product-list__shop-location'>
              <div className='product-list__shop-name'>Central Jacket Bandung</div>
              <div className='product-list__location'>
                <img className='product-list__icon-location' src='http://placehold.it/15x15' />
                <span className='product-list__location-name ellipsis'>
                  Bandung Bjsjsjsjssjsjhdjdjkdjdjddj djdjdjdj
                </span>
              </div>
              <div className='product-list__icon-box'>
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
                <img className='product-list__icon-badge' src='http://placehold.it/15x15' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProductList
