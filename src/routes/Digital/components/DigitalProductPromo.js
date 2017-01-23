import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

import './DigitalProductPromo.scss'
import CopyIcon from '../assets/icon-copy.png'
import SurveyIcon from '../assets/icon-survey.png'

class DigitalProductPromo extends Component {

  componentDidMount() {
    $(document).on('click', '.dp-promo__btn, .dp-promo__code', function(e) {
      e.stopPropagation();
      e.preventDefault();
      window.getSelection().removeAllRanges();

      if ($(e.target).closest('button').hasClass('dp-promo__btn')) {
        var code = $(this).siblings('span').get(0);
      } else {
        var code = $(this).get(0);
      }

      if (document.createRange) {
        var r = document.createRange();
        r.setStartBefore(code);
        r.setEndAfter(code);
        r.selectNode(code);
        var sel = window.getSelection();
        sel.addRange(r);
        document.execCommand('Copy');
      }

      setTimeout(function() {
      $('.dp-promo__alert').fadeOut('slow');}, 2000);
      $(this).siblings('.dp-promo__alert').removeClass('u-display-none').fadeIn('fast');
    });
  }

  render() {
    return(
      <div className='wrapper'>

        <div className='u-clearfix dp-promo__container'>
          <div className='u-mb1 dp-promo__title'>
            <span>Promo</span>
          </div>
          <div className='dp-promo__content'>
            <Link className='u-clearfix u-rounded u-mb2 dp-promo__box'>
              <div className='u-mb1 dp-promo__text'>
                Dapatkan cashback hingga Rp 20.000 ke TopPoints tiap pembayaran Tagihan Listrik
              </div>
              <div className='dp-promo__text--sub'>
                Kode voucher: &nbsp;
                <span className='dp-promo__code'>PLN20</span>
                <button className='dp-promo__btn u-p0'>
                  <img src={CopyIcon} alt='icon-copy-code' className='u-align-middle' />
                </button>
                <div className='u-center u-mt2 u-mb1 u-py1 u-rounded dp-promo__alert u-display-none'>
                  Kode voucher tersalin
                </div>
              </div>
            </Link>

            <Link className='u-clearfix u-rounded u-mb2 dp-promo__box'>
              <div className='u-mb1 dp-promo__text'>
                LEBIH HEMAT, beli pulsa & paket data apa aja di Tokopedia. Ada bonus cashback TopPoints juga.
              </div>
              <div className='dp-promo__text--sub'>
                Beli sekarang!
              </div>
            </Link>

            <Link className='u-clearfix u-rounded u-mb2 dp-promo__box'>
              <div className='u-mb1 dp-promo__text'>
                Berbagi untuk sesama Dimulai dari Tokopedia. Yuk berdonasi bersama TopDonasi Bebas!
              </div>
              <div className='dp-promo__text--sub'>
                Klik untuk info lebih lanjut
              </div>
            </Link>

          </div>
        </div>

        <div className='u-center u-p2 dp-survey__container'>
          <picture>
            <img src={SurveyIcon} alt='icon-survey' className='u-align-middle' />
            Saran Anda penting bagi kami.
          </picture>
          <Link to='' className='u-nowrap dp-survey__link'>&nbsp;Klik link berikut ini.</Link>
        </div>

      </div>
    )
  }
}

export default DigitalProductPromo
