import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './DigitalProductTab.scss'

class DonationTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'donasi',
      shownTabs: ['pulsa', 'data', 'donasi'],
      modalOpened: false
    }
  }

  isTabShown(name) {
    if (this.state.shownTabs.indexOf(name) < 0) {
      return false;
    } else {
      return true;
    }
  }

  isItemInModal(name) {
    if (this.isTabShown(name)) {
      if (this.state.activeTab === name) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  handleOpenModal() {
    this.setState({
      modalOpened: true
    })
  }

  handleCloseModal() {
    this.setState({
      modalOpened: false
    })
  }

  handleTabChange(name) {
    this.setState({
      activeTab: name,
      modalOpened: false
    })

    if (this.state.shownTabs.indexOf(name) < 0) {
      this.state.shownTabs.pop();
      this.state.shownTabs.push(name);
    }
  }

  render() {
    return(
      <nav className='dp-tab u-clearfix'>
        <ul className='dp-tab__container'>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('pulsa')})} onClick={this.handleTabChange.bind(this, 'pulsa')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'pulsa' })}>
              <i className='dp-tab__icon dp-tab__icon--pulsa'></i>
              <div className='dp-tab__name'>Pulsa</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('data')})} onClick={this.handleTabChange.bind(this, 'data')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'data' })}>
              <i className='dp-tab__icon dp-tab__icon--data'></i>
              <div className='dp-tab__name'>Paket Data</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('bpjs')})} onClick={this.handleTabChange.bind(this, 'bpjs')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'bpjs' })}>
              <i className='dp-tab__icon dp-tab__icon--bpjs'></i>
              <div className='dp-tab__name'>BPJS</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('pln')})} onClick={this.handleTabChange.bind(this, 'pln')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'pln' })}>
              <i className='dp-tab__icon dp-tab__icon--pln'></i>
              <div className='dp-tab__name'>Listrik PLN</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('saldo')})} onClick={this.handleTabChange.bind(this, 'saldo')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'saldo' })}>
              <i className='dp-tab__icon dp-tab__icon--saldo'></i>
              <div className='dp-tab__name'>Saldo</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('game')})} onClick={this.handleTabChange.bind(this, 'game')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'game' })}>
              <i className='dp-tab__icon dp-tab__icon--game'></i>
              <div className='dp-tab__name'>Voucher Game</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('air')})} onClick={this.handleTabChange.bind(this, 'air')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'air' })}>
              <div className='dp-tab__ribbon'>BARU</div>
              <i className='dp-tab__icon dp-tab__icon--air'></i>
              <div className='dp-tab__name'>Air PDAM</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('angsuran')})} onClick={this.handleTabChange.bind(this, 'angsuran')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'angsuran' })}>
              <div className='dp-tab__ribbon'>BARU</div>
              <i className='dp-tab__icon dp-tab__icon--angsuran'></i>
              <div className='dp-tab__name'>Angsuran Kredit</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('donasi')})} onClick={this.handleTabChange.bind(this, 'donasi')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'donasi' })}>
              <div className='dp-tab__ribbon'>BARU</div>
              <i className='dp-tab__icon dp-tab__icon--donasi'></i>
              <div className='dp-tab__name'>Donasi</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('pascabayar')})} onClick={this.handleTabChange.bind(this, 'pascabayar')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'pascabayar' })}>
              <div className='dp-tab__ribbon'>BARU</div>
              <i className='dp-tab__icon dp-tab__icon--pascabayar'></i>
              <div className='dp-tab__name'>Pascabayar</div>
            </Link>
          </li>
          <li className={classNames('dp-tab__item', {'u-hide': !this.isTabShown('tvkabel')})} onClick={this.handleTabChange.bind(this, 'tvkabel')}>
            <Link href='https://pulsa.tokopedia.com' className={classNames('dp-tab__url', {'active': this.state.activeTab === 'tvkabel' })}>
              <div className='dp-tab__ribbon'>BARU</div>
              <i className='dp-tab__icon dp-tab__icon--tvkabel'></i>
              <div className='dp-tab__name'>TV Kabel</div>
            </Link>
          </li>
          <li className='dp-tab__item' onClick={this.handleOpenModal.bind(this)}>
            <Link className='dp-tab__url'>
              <i className='dp-tab__icon dp-tab__icon--others'></i>
              <div className='dp-tab__name'>Lainnya</div>
            </Link>
          </li>
        </ul>
        <div className={classNames('dp-tab__overlay', {'u-hide': !this.state.modalOpened})}></div>
        <div className={classNames('dp-tab__modal', {'u-hide': !this.state.modalOpened})}>
          <div className='dp-modal__box'>
            <div className='dp-modal__title'>
              Produk Lainnya
              <div className='dp-modal__close' onClick={this.handleCloseModal.bind(this)}></div>
            </div>
            <ul className='dp-modal__tab'>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('pulsa')})} onClick={this.handleTabChange.bind(this, 'pulsa')}>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'pulsa' })}>
                  <i className='dp-tab__icon dp-tab__icon--pulsa'></i>
                  <div className='dp-tab__name'>Pulsa</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('data')})} onClick={this.handleTabChange.bind(this, 'data')}>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'data' })}>
                  <i className='dp-tab__icon dp-tab__icon--data'></i>
                  <div className='dp-tab__name'>Paket Data</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('bpjs')})} onClick={this.handleTabChange.bind(this, 'bpjs')}>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'bpjs' })}>
                  <i className='dp-tab__icon dp-tab__icon--bpjs'></i>
                  <div className='dp-tab__name'>BPJS</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('pln')})} onClick={this.handleTabChange.bind(this, 'pln')}>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'pln' })}>
                  <i className='dp-tab__icon dp-tab__icon--pln'></i>
                  <div className='dp-tab__name'>Listrik PLN</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('saldo')})} onClick={this.handleTabChange.bind(this, 'saldo')}>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'saldo' })}>
                  <i className='dp-tab__icon dp-tab__icon--saldo'></i>
                  <div className='dp-tab__name'>Saldo</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('game')})} onClick={this.handleTabChange.bind(this, 'game')}>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'game' })}>
                  <i className='dp-tab__icon dp-tab__icon--game'></i>
                  <div className='dp-tab__name'>Voucher Game</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('air')})} onClick={this.handleTabChange.bind(this, 'air')}>
                <div className='dp-modal__ribbon'>BARU</div>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'air' })}>
                  <i className='dp-tab__icon dp-tab__icon--air'></i>
                  <div className='dp-tab__name'>Air PDAM</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('angsuran')})} onClick={this.handleTabChange.bind(this, 'angsuran')}>
                <div className='dp-modal__ribbon'>BARU</div>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'angsuran' })}>
                  <i className='dp-tab__icon dp-tab__icon--angsuran'></i>
                  <div className='dp-tab__name'>Angsuran Kredit</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('donasi')})} onClick={this.handleTabChange.bind(this, 'donasi')}>
                <div className='dp-modal__ribbon'>BARU</div>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'donasi' })}>
                  <i className='dp-tab__icon dp-tab__icon--donasi'></i>
                  <div className='dp-tab__name'>Donasi</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('pascabayar')})} onClick={this.handleTabChange.bind(this, 'pascabayar')}>
                <div className='dp-modal__ribbon'>BARU</div>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'pascabayar' })}>
                  <i className='dp-tab__icon dp-tab__icon--pascabayar'></i>
                  <div className='dp-tab__name'>Pascabayar</div>
                </Link>
              </li>
              <li className={classNames('dp-modal__item', {'u-hide': !this.isItemInModal('tvkabel')})} onClick={this.handleTabChange.bind(this, 'tvkabel')}>
                <div className='dp-modal__ribbon'>BARU</div>
                <Link className={classNames('dp-tab__url', 'u-mt2', {'active': this.state.activeTab === 'tvkabel' })}>
                  <i className='dp-tab__icon dp-tab__icon--tvkabel'></i>
                  <div className='dp-tab__name'>TV Kabel</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        { this.state.modalOpened && <BodyClassName className='u-body-overflow-no-scroll' /> }
      </nav>
    )
  }
}

export default DonationTab
