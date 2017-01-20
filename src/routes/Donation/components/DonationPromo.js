import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

import CopyIcon from '../assets/icon-copy.png'
import SurveyIcon from '../assets/icon-survey.png'

class DonationPromo extends Component {

  componentDidMount() {
    $(document).on('click', '.copy-code, .voucher-code', function(e) {
      e.stopPropagation();
      e.preventDefault();
      window.getSelection().removeAllRanges();

      if ($(e.target).closest('button').hasClass('copy-code')) {
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
      $('.voucher-code-alert').fadeOut('slow');}, 2000);
      $(this).siblings('.voucher-code-alert').removeClass('u-display-none').fadeIn('fast');
    });
  }

  render() {
    return(
      <div className='wrapper'>

        <div className='u-clearfix promo__container'>
          <div className='u-mb1 promo--label'>
            <span>Promo</span>
          </div>
          <div className='promo__box-card'>
            <Link className='u-clearfix u-rounded u-mb2 box-card__link'>
              <div className='u-mb1 box-card--content'>
                Dapatkan cashback hingga Rp 20.000 ke TopPoints tiap pembayaran Tagihan Listrik
              </div>
              <div className='box-card--voucher'>
                Kode voucher: &nbsp;
                <span className='voucher-code'>PLN20</span>
                <button className='copy-code u-p0'>
                  <img src={CopyIcon} alt='icon-copy-code' className='u-align-middle' />
                </button>
                <div className='u-center u-mt2 u-mb1 u-py1 u-rounded voucher-code-alert u-display-none'>
                  Kode voucher tersalin
                </div>
              </div>
            </Link>
            <Link className='u-clearfix u-rounded u-mb2 box-card__link'>
              <div className='u-mb1 box-card--content'>
                LEBIH HEMAT, beli pulsa & paket data apa aja di Tokopedia. Ada bonus cashback TopPoints juga.
              </div>
              <div className='box-card--voucher'>
                Beli sekarang!
              </div>
            </Link>
            <Link className='u-clearfix u-rounded u-mb2 box-card__link'>
              <div className='u-mb1 box-card--content'>
                Berbagi untuk sesama Dimulai dari Tokopedia. Yuk berdonasi bersama TopDonasi Bebas!
              </div>
              <div className='box-card--voucher'>
                Klik untuk info lebih lanjut
              </div>
            </Link>
          </div>
        </div>

        <div className='u-center u-p2 survey__container'>
          <picture>
            {/*<source type='image/webp' src={SurveyIconWebp} />*/}
            <img src={SurveyIcon} alt='icon-survey' className='u-align-middle' />
            Saran Anda penting bagi kami.
          </picture>
          <Link to='' className='u-nowrap survey--link'>&nbsp;Klik link berikut ini.</Link>
        </div>

      </div>
    )
  }
}

export default DonationPromo
