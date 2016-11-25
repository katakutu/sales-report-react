import React from 'react'
import './MenuMore.scss'
import Icon from '../../components/Icon'
import Panel from '../../components/Panel'

export const MenuMore = () => (
  <div className='menu-more u-clearfix'>
    <div className='menu-more__header u-center'>
      <div className='menu-more__header-upper'>
        <img src='http://placehold.it/50x50' alt='' className='menu-more__avatar' />
        <p className='menu-more__username'>Fauzan Arief Rachman</p>
        <p className='menu-more__toppoints'>TopPoints Rp 500.000</p>
      </div>
      <div className='menu-more__header-lower'>
        <a href='#' className='menu-more__shop-btn'>
          <span className='u-block u-my1 menu-more__shop-name'>My Goods Store</span>
          <span className='u-block u-my1 menu-more__shop-type'>Reguler Merchant</span>
        </a>
        <div className='menu-more__saldo u-clearfix'>
          <div className='u-col u-col-6 u-left-align'>
            Saldo
          </div>
          <div className='u-col u-col-6 u-right-align'>
            Rp 50.939.233
          </div>
        </div>
      </div>
    </div>
    <Panel injectClassName='u-clearfix menu-more__content'>
      <div className='menu-more__content-header'>
        <Icon iconName='pesan'></Icon>
        <h1 className='u-inline-block'>Kotak Masuk</h1>
      </div>
      <ul className='menu-more__content-list u-list-reset'>
        <li>
          <a href='#'>Pesan</a>
        </li>
        <li>
          <a href='#'>Diskusi</a>
        </li>
        <li>
          <a href='#'>Ulasan</a>
        </li>
        <li>
          <a href='#'>Layanan Pengguna</a>
        </li>
        <li>
          <a href='#'>Pusat Resolusi</a>
        </li>
      </ul>
    </Panel>
    <Panel injectClassName='u-clearfix menu-more__content'>
      <div className='menu-more__content-header'>
        <Icon iconName='pembelian'></Icon>
        <h1 className='u-inline-block'>Pembelian</h1>
      </div>
      <ul className='menu-more__content-list u-list-reset'>
        <li>
          <a href='#'>Konfirmasi Pembayaran</a>
        </li>
        <li>
          <a href='#'>Konfirmasi Penerimaan</a>
        </li>
        <li>
          <a href='#'>Status Pemesanan</a>
        </li>
        <li>
          <a href='#'>Transaksi Batal</a>
        </li>
        <li>
          <a href='#'>Daftar Pembelian</a>
        </li>
      </ul>
    </Panel>
    <Panel injectClassName='u-clearfix menu-more__content'>
      <div className='menu-more__content-header'>
        <Icon iconName='lainnya'></Icon>
        <h1 className='u-inline-block'>Lainnya</h1>
      </div>
      <ul className='menu-more__content-list u-list-reset'>
        <li>
          <a href='#'>Belanja di Tokopedia</a>
        </li>
        <li>
          <a href='#'>Jualan di Tokopedia</a>
        </li>
        <li>
          <a href='#'>Pesan Tiket Kereta</a>
        </li>
        <li>
          <a href='#'>Isi Ulang Pulsa</a>
        </li>
        <li>
          <a href='#'>Seller Center</a>
        </li>
      </ul>
    </Panel>
    <Panel injectClassName='u-clearfix menu-more__content'>
      <div className='menu-more__content-header'>
        <Icon iconName='penjualan'></Icon>
        <h1 className='u-inline-block'>Penjualan</h1>
      </div>
      <ul className='menu-more__content-list u-list-reset'>
        <li>
          <a href='#'>Order Baru</a>
        </li>
        <li>
          <a href='#'>Konfirmasi Penerimaan</a>
        </li>
        <li>
          <a href='#'>Status Pengiriman</a>
        </li>
        <li>
          <a href='#'>Daftar Penjualan</a>
        </li>
        <li>
          <a href='#'>Daftar Produk</a>
        </li>
        <li>
          <a href='#'>Etalase Toko</a>
        </li>
      </ul>
    </Panel>
    <Panel injectClassName='u-clearfix menu-more__content'>
      <div className='menu-more__content-header'>
        <Icon iconName='lainnya'></Icon>
        <h1 className='u-inline-block'>Lainnya</h1>
      </div>
      <ul className='menu-more__content-list u-list-reset'>
        <li>
          <a href='#'>Belanja di Tokopedia</a>
        </li>
        <li>
          <a href='#'>Jualan di Tokopedia</a>
        </li>
        <li>
          <a href='#'>Pesan Tiket Kereta</a>
        </li>
        <li>
          <a href='#'>Isi Ulang Pulsa</a>
        </li>
        <li>
          <a href='#'>Seller Center</a>
        </li>
      </ul>
    </Panel>
  </div>
)

export default MenuMore
