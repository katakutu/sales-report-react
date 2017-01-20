import React from 'react'
import { Link } from 'react-router'
import './DonationLinks.scss'

export const DonationLinks = () => (
  <section className='dp-links__container'>
    <div className='dp-links__group'>
      <p className='dp-links__title u-mt0'>Pulsa Online</p>
      <p className='dp-links__list'>
        <Link to='https://pulsa.tokopedia.com/simpati/' className='dp-links__a'>Simpati</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/smartfren/' className='dp-links__a'>Smartfren</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/bolt/' className='dp-links__a'>Bolt</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/3/' className='dp-links__a'>Tri</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/im3/' className='dp-links__a'>IM3 Ooredoo</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/xl/' className='dp-links__a'>Kartu XL</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/axis/' className='dp-links__a'>Axis</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/mentari/' className='dp-links__a'>Mentari</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/as/' className='dp-links__a'>Kartu AS</Link>
      </p>
    </div>
    <div className='dp-links__group'>
      <p className='dp-links__title u-mt0'><Link to='https://pulsa.tokopedia.com/paket-data/'>Paket Internet</Link></p>
      <p className='dp-links__list'>
        <Link to='https://pulsa.tokopedia.com/paket-internet-telkomsel/' className='dp-links__a'>Paket Data Telkomsel</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-indosat/' className='dp-links__a'>Paket Data Indosat</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-tri/' className='dp-links__a'>Paket Data Tri</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-xl/' className='dp-links__a'>Paket Data XL</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-axis/' className='dp-links__a'>Paket Data Axis</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-bolt/' className='dp-links__a'>Paket Data Bolt</Link>
      </p>
    </div>
    <div className='dp-links__group'>
      <p className='dp-links__title u-mt0'>Pembayaran Online</p>
      <p className='dp-links__list'>
        <Link to='https://pulsa.tokopedia.com/pdam/' className='dp-links__a'>Air PDAM</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/tv-kabel/' className='dp-links__a'>TV Kabel</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/pascabayar/' className='dp-links__a'>Pascabayar</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/donasi/' className='dp-links__a'>Donasi</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/saldo/' className='dp-links__a'>Saldo Tokopedia</Link>
      </p>
    </div>
    <div className='dp-links__group'>
      <p className='dp-links__title u-mt0'><Link to='https://pulsa.tokopedia.com/bpjs/'>BPJS</Link></p>
      <p className='dp-links__list'>
        <Link to='https://pulsa.tokopedia.com/bpjs-kesehatan/' className='dp-links__a'>BPJS Kesehatan</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/bpjs-ketenagakerjaan/' className='dp-links__a'>BPJS Ketenagakerjaan</Link>
      </p>
    </div>
    <div className='dp-links__group'>
      <p className='dp-links__title u-mt0'>Listrik</p>
      <p className='dp-links__list'>
        <Link to='https://pulsa.tokopedia.com/token-listrik/' className='dp-links__a'>Token Listrik</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/tagihan-listrik/' className='dp-links__a'>Bayar Tagihan Listrik</Link>
      </p>
    </div>
    <div className='dp-links__group'>
      <p className='dp-links__title u-mt0'><Link to='https://pulsa.tokopedia.com/angsuran/'>Angsuran</Link></p>
      <p className='dp-links__list'>
        <Link to='https://pulsa.tokopedia.com/kredit-mobil/' className='dp-links__a'>Kredit Mobil</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/kredit-motor/' className='dp-links__a'>Kredit Motor</Link>
      </p>
    </div>
    <div className='dp-links__group'>
      <p className='dp-links__title u-mt0'><Link to='https://pulsa.tokopedia.com/voucher-game/'>Voucher Game</Link></p>
      <p className='dp-links__list'>
        <Link to='https://pulsa.tokopedia.com/garena/' className='dp-links__a'>Garena</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/steam/' className='dp-links__a'>Steam Wallet</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/lyto/' className='dp-links__a'>Lyto Game On</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/google-play/' className='dp-links__a'>Google Play</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/megaxus/' className='dp-links__a'>Megaxus</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/itunes/' className='dp-links__a'>iTunes</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/gemscool/' className='dp-links__a'>Gemscool</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/psn-card/' className='dp-links__a'>PSN Card</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/playstation-plus/' className='dp-links__a'>Playstation Plus</Link>
      </p>
    </div>
  </section>
)

export default DonationLinks
