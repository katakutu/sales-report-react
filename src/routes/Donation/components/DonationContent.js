import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import classNames from 'classnames'

import './DonationView.scss'
import BaznasLogo from '../assets/lembaga/baznas1.png'
import DompetDuafaLogo from '../assets/lembaga/dompet_duafa.png'
import PkpuLogo from '../assets/lembaga/pkpu.png'
import YcabLogo from '../assets/lembaga/ycab1.png'

class DonationContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      instantCheckout: false,
      activeContent: 'baznas'
    }
  }

  handleInstantCheckbox() {
    this.setState({
      instantCheckout: !this.state.instantCheckout
    })
  }

  handleContentChange(name) {
    this.setState({
      activeContent: name
    })
  }

  render() {
    return (
      <div className='u-clearfix donasi-content'>
        <div className='donasi__container u-p0'>
          <form>
            <h1 className='u-clearfix u-block u-mt2 u-mb0 u-mx-auto u-left-align u-bold u-col-12'>
              Salurkan Donasi Untuk Berbagi Dengan Sesama
            </h1>
            <div className='donasi--lembaga'>
              <div className='lembaga-tab-list'>
                <label className='u-inline-block'>Pilih Lembaga Donasi</label>
                <div><small className='u-h5 error-input u-display-none u-inline-block ' id='error-client-number'>Anda belum memilih lembaga donasi</small></div>
                <ul className='u-clearfix u-mt0 u-mb0 u-pl0 u-list-style-none lembaga-logo-list'>
                  <li onClick={this.handleContentChange.bind(this, 'baznas')}>
                    <div className='lembaga-tab-logo'>
                      <img src={BaznasLogo} alt='' />
                    </div>
                  </li>
                  <li onClick={this.handleContentChange.bind(this, 'ycab')}>
                    <div className='lembaga-tab-logo'>
                      <img src={YcabLogo} alt='' />
                    </div>
                  </li>
                  <li onClick={this.handleContentChange.bind(this, 'dompetdhuafa')}>
                    <div className='lembaga-tab-logo'>
                      <img src={DompetDuafaLogo} alt='' />
                    </div>
                  </li>
                  <li onClick={this.handleContentChange.bind(this, 'pkpu')}>
                    <div className='lembaga-tab-logo'>
                      <img src={PkpuLogo} alt='' />
                    </div>
                  </li>
                </ul>
              </div>
              <div className='lembaga-tab-content'>
                <div className={classNames('u-clearfix', 'u-relative', 'lembaga-content', {'u-hide': this.state.activeContent !== 'baznas'})}>
                  <div className='u-relative u-mb2 u-center lembaga-content-img'>
                    <img src={BaznasLogo} alt='' className='u-align-middle' />
                  </div>
                  <div className='lembaga-content-text'>
                    <p className='u-h5 u-mt0 u-mb2'>Badan Amil Zakat Nasional (BAZNAS) merupakan lembaga yang di bentuk pemerintah melalui KEPPRES No. 8 Tahun 2001 yang memiliki fungsi penghimpunan dan penyaluran zakat, infak, dan sedekah (ZIS) sesuai undang-undang nomor 23 tahun 2011 tentang pengelolaan zakat.</p>
                    <p className='u-h5 u-mt0 u-mb0'>
                      <Link to='http://www.baznas.go.id/'>Lihat selengkapnya ›</Link>
                    </p>
                  </div>
                </div>
                <div className={classNames('u-clearfix', 'u-relative', 'lembaga-content', {'u-hide': this.state.activeContent !== 'ycab'})}>
                  <div className='u-relative u-mb2 u-center lembaga-content-img'>
                    <img src={YcabLogo} alt='' className='u-align-middle' />
                  </div>
                  <div className='lembaga-content-text'>
                    <p className='u-h5 u-mt0 u-mb2'>YCAB Foundation (Yayasan Cinta Anak Bangsa) adalah sebuah organisasi non-profit yang berfokus pada menciptakan kemandirian bagi anak muda melalui pendidikan, pemberdayaan ekonomi dan promosi gaya hidup sehat.</p>
                    <p className='u-h5 u-mt0 u-mb0'>
                      <Link to='http://www.ycabfoundation.org/'>Lihat selengkapnya ›</Link>
                    </p>
                  </div>
                </div>
                <div className={classNames('u-clearfix', 'u-relative', 'lembaga-content', {'u-hide': this.state.activeContent !== 'dompetdhuafa'})}>
                  <div className='u-relative u-mb2 u-center lembaga-content-img'>
                    <img src={DompetDuafaLogo} alt='' className='u-align-middle' />
                  </div>
                  <div className='lembaga-content-text'>
                    <p className='u-h5 u-mt0 u-mb2'>Dompet Dhuafa adalah Lembaga Nirlaba milik masyarakat yang berkhidmat mengangkat harkat sosial kemanusiaan dengan mendayagunakan Zakat, Infak, Sedekah dan Wakaf (ZISWAF) serta dana sosial lainnya baik dari individu, kelompok maupun perusahaan.</p>
                    <p className='u-h5 u-mt0 u-mb0'>
                      <Link to='http://www.dompetdhuafa.org/'>Lihat selengkapnya ›</Link>
                    </p>
                  </div>
                </div>
                <div className={classNames('u-clearfix', 'u-relative', 'lembaga-content', {'u-hide': this.state.activeContent !== 'pkpu'})}>
                  <div className='u-relative u-mb2 u-center lembaga-content-img'>
                    <img src={PkpuLogo} alt='' className='u-align-middle' />
                  </div>
                  <div className='lembaga-content-text'>
                    <p className='u-h5 u-mt0 u-mb2'>PKPU adalah sebuah badan hukum berbentuk yayasan yang bersifat sosial dan kemanusiaan dan menjalankan kegiatan usahanya dalam bidang pengelolaan dana CSR dan donasi-donasi tidak mengikat lainnya.</p>
                    <p className='u-h5 u-mt0 u-mb0'>
                      <Link to='http://www.pkpu.or.id/'>Lihat selengkapnya ›</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='donasi--nominal'>
              <div className='form-group nominal u-mb2 u-block'>
                <label className='u-mb1'>Nominal</label>
                <div className='donasi-select'>
                  <select className='donasi-select form-control form-select'>
                    <option value='25000'>Rp 25.000</option>
                    <option value='50000'>Rp 50.000</option>
                    <option value='100000'>Rp 100.000</option>
                    <option value='200000'>Rp 200.000</option>
                    <option value='300000'>Rp 300.000</option>
                    <option value='500000'>Rp 500.000</option>
                    <option value='1000000'>Rp 1.000.000</option>
                  </select>
                </div>
              </div>
              <div className='donasi--buy'>
                <div className='donasi__checkbox checkbox'>
                  <input type='checkbox' id='instant_checkout' checked={this.state.instantCheckout} />
                  <label onClick={this.handleInstantCheckbox.bind(this)} >
                    <span className='donasi-checkbox'></span>
                    Bayar instan
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default DonationContent
