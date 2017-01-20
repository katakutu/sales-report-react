import React, { Component } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import BodyClassName from 'react-body-classname'
import './DonationView.scss'

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
      <nav className='digital__tab u-clearfix'>
        <ul className='tab__container'>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('pulsa')})} onClick={this.handleTabChange.bind(this, 'pulsa')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'pulsa' })}>
              <i className='tab__icon tab__icon--pulsa'></i>
              <div className='tab__name'>Pulsa</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('data')})} onClick={this.handleTabChange.bind(this, 'data')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'data' })}>
              <i className='tab__icon tab__icon--data'></i>
              <div className='tab__name'>Paket Data</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('bpjs')})} onClick={this.handleTabChange.bind(this, 'bpjs')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'bpjs' })}>
              <i className='tab__icon tab__icon--bpjs'></i>
              <div className='tab__name'>BPJS</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('pln')})} onClick={this.handleTabChange.bind(this, 'pln')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'pln' })}>
              <i className='tab__icon tab__icon--pln'></i>
              <div className='tab__name'>Listrik PLN</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('saldo')})} onClick={this.handleTabChange.bind(this, 'saldo')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'saldo' })}>
              <i className='tab__icon tab__icon--saldo'></i>
              <div className='tab__name'>Saldo</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('game')})} onClick={this.handleTabChange.bind(this, 'game')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'game' })}>
              <i className='tab__icon tab__icon--game'></i>
              <div className='tab__name'>Voucher Game</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('air')})} onClick={this.handleTabChange.bind(this, 'air')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'air' })}>
              <div className='tab__ribbon'>BARU</div>
              <i className='tab__icon tab__icon--air'></i>
              <div className='tab__name'>Air PDAM</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('angsuran')})} onClick={this.handleTabChange.bind(this, 'angsuran')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'angsuran' })}>
              <div className='tab__ribbon'>BARU</div>
              <i className='tab__icon tab__icon--angsuran'></i>
              <div className='tab__name'>Angsuran Kredit</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('donasi')})} onClick={this.handleTabChange.bind(this, 'donasi')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'donasi' })}>
              <div className='tab__ribbon'>BARU</div>
              <i className='tab__icon tab__icon--donasi'></i>
              <div className='tab__name'>Donasi</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('pascabayar')})} onClick={this.handleTabChange.bind(this, 'pascabayar')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'pascabayar' })}>
              <div className='tab__ribbon'>BARU</div>
              <i className='tab__icon tab__icon--pascabayar'></i>
              <div className='tab__name'>Pascabayar</div>
            </Link>
          </li>
          <li className={classNames('tab__item', {'u-hide': !this.isTabShown('tvkabel')})} onClick={this.handleTabChange.bind(this, 'tvkabel')}>
            <Link className={classNames('tab__url', {'active': this.state.activeTab === 'tvkabel' })}>
              <div className='tab__ribbon'>BARU</div>
              <i className='tab__icon tab__icon--tvkabel'></i>
              <div className='tab__name'>TV Kabel</div>
            </Link>
          </li>
          <li className='tab__item' onClick={this.handleOpenModal.bind(this)}>
            <Link className='tab__url'>
              <i className='tab__icon tab__icon--others'></i>
              <div className='tab__name'>Lainnya</div>
            </Link>
          </li>
        </ul>

        <div className={classNames('tab__overlay', {'u-hide': !this.state.modalOpened})}></div>
        <div className={classNames('tab__modal', {'u-hide': !this.state.modalOpened})}>
          <div className='modal__box'>
            <div className='modal__title'>
              Produk Lainnya
              <div className='modal__close' onClick={this.handleCloseModal.bind(this)}></div>
            </div>
            <ul className='modal__tab'>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('pulsa')})} onClick={this.handleTabChange.bind(this, 'pulsa')}>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'pulsa' })}>
                  <i className='tab__icon tab__icon--pulsa'></i>
                  <div className='tab__name'>Pulsa</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('data')})} onClick={this.handleTabChange.bind(this, 'data')}>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'data' })}>
                  <i className='tab__icon tab__icon--data'></i>
                  <div className='tab__name'>Paket Data</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('bpjs')})} onClick={this.handleTabChange.bind(this, 'bpjs')}>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'bpjs' })}>
                  <i className='tab__icon tab__icon--bpjs'></i>
                  <div className='tab__name'>BPJS</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('pln')})} onClick={this.handleTabChange.bind(this, 'pln')}>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'pln' })}>
                  <i className='tab__icon tab__icon--pln'></i>
                  <div className='tab__name'>Listrik PLN</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('saldo')})} onClick={this.handleTabChange.bind(this, 'saldo')}>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'saldo' })}>
                  <i className='tab__icon tab__icon--saldo'></i>
                  <div className='tab__name'>Saldo</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('game')})} onClick={this.handleTabChange.bind(this, 'game')}>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'game' })}>
                  <i className='tab__icon tab__icon--game'></i>
                  <div className='tab__name'>Voucher Game</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('air')})} onClick={this.handleTabChange.bind(this, 'air')}>
                <div className='modal__ribbon'>BARU</div>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'air' })}>
                  <i className='tab__icon tab__icon--air'></i>
                  <div className='tab__name'>Air PDAM</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('angsuran')})} onClick={this.handleTabChange.bind(this, 'angsuran')}>
                <div className='modal__ribbon'>BARU</div>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'angsuran' })}>
                  <i className='tab__icon tab__icon--angsuran'></i>
                  <div className='tab__name'>Angsuran Kredit</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('donasi')})} onClick={this.handleTabChange.bind(this, 'donasi')}>
                <div className='modal__ribbon'>BARU</div>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'donasi' })}>
                  <i className='tab__icon tab__icon--donasi'></i>
                  <div className='tab__name'>Donasi</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('pascabayar')})} onClick={this.handleTabChange.bind(this, 'pascabayar')}>
                <div className='modal__ribbon'>BARU</div>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'pascabayar' })}>
                  <i className='tab__icon tab__icon--pascabayar'></i>
                  <div className='tab__name'>Pascabayar</div>
                </Link>
              </li>
              <li className={classNames('modal__item', {'u-hide': !this.isItemInModal('tvkabel')})} onClick={this.handleTabChange.bind(this, 'tvkabel')}>
                <div className='modal__ribbon'>BARU</div>
                <Link className={classNames('tab__url', 'u-mt2', {'active': this.state.activeTab === 'tvkabel' })}>
                  <i className='tab__icon tab__icon--tvkabel'></i>
                  <div className='tab__name'>TV Kabel</div>
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
