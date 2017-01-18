import React from 'react'
import { Link } from 'react-router'
import './DonationView.scss'

export const DonationLinks = () => (
  <section className='links'>
    <div className='links__group'>
      <p className='links__title u-mt0'>Pulsa Online</p>
      <p className='links__list'>
        <Link to='https://pulsa.tokopedia.com/simpati/' className='links__a'>Simpati</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/smartfren/' className='links__a'>Smartfren</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/bolt/' className='links__a'>Bolt</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/3/' className='links__a'>Tri</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/im3/' className='links__a'>IM3 Ooredoo</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/xl/' className='links__a'>Kartu XL</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/axis/' className='links__a'>Axis</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/mentari/' className='links__a'>Mentari</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/as/' className='links__a'>Kartu AS</Link>
      </p>
    </div>
    <div className='links__group'>
      <p className='links__title u-mt0'><Link to='https://pulsa.tokopedia.com/paket-data/'>Paket Internet</Link></p>
      <p className='links__list'>
        <Link to='https://pulsa.tokopedia.com/paket-internet-telkomsel/' className='links__a'>Paket Data Telkomsel</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-indosat/' className='links__a'>Paket Data Indosat</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-tri/' className='links__a'>Paket Data Tri</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-xl/' className='links__a'>Paket Data XL</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-axis/' className='links__a'>Paket Data Axis</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/paket-internet-bolt/' className='links__a'>Paket Data Bolt</Link>
      </p>
    </div>
    <div className='links__group'>
      <p className='links__title u-mt0'>Pembayaran Online</p>
      <p className='links__list'>
        <Link to='https://pulsa.tokopedia.com/pdam/' className='links__a'>Air PDAM</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/tv-kabel/' className='links__a'>TV Kabel</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/pascabayar/' className='links__a'>Pascabayar</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/donasi/' className='links__a'>Donasi</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/saldo/' className='links__a'>Saldo Tokopedia</Link>
      </p>
    </div>
    <div className='links__group'>
      <p className='links__title u-mt0'><Link to='https://pulsa.tokopedia.com/bpjs/'>BPJS</Link></p>
      <p className='links__list'>
        <Link to='https://pulsa.tokopedia.com/bpjs-kesehatan/' className='links__a'>BPJS Kesehatan</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/bpjs-ketenagakerjaan/' className='links__a'>BPJS Ketenagakerjaan</Link>
      </p>
    </div>
    <div className='links__group'>
      <p className='links__title u-mt0'>Listrik</p>
      <p className='links__list'>
        <Link to='https://pulsa.tokopedia.com/token-listrik/' className='links__a'>Token Listrik</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/tagihan-listrik/' className='links__a'>Bayar Tagihan Listrik</Link>
      </p>
    </div>
    <div className='links__group'>
      <p className='links__title u-mt0'><Link to='https://pulsa.tokopedia.com/angsuran/'>Angsuran</Link></p>
      <p className='links__list'>
        <Link to='https://pulsa.tokopedia.com/kredit-mobil/' className='links__a'>Kredit Mobil</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/kredit-motor/' className='links__a'>Kredit Motor</Link>
      </p>
    </div>
    <div className='links__group'>
      <p className='links__title u-mt0'><Link to='https://pulsa.tokopedia.com/voucher-game/'>Voucher Game</Link></p>
      <p className='links__list'>
        <Link to='https://pulsa.tokopedia.com/garena/' className='links__a'>Garena</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/steam/' className='links__a'>Steam Wallet</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/lyto/' className='links__a'>Lyto Game On</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/google-play/' className='links__a'>Google Play</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/megaxus/' className='links__a'>Megaxus</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/itunes/' className='links__a'>iTunes</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/gemscool/' className='links__a'>Gemscool</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/psn-card/' className='links__a'>PSN Card</Link> <span> • </span>
        <Link to='https://pulsa.tokopedia.com/playstation-plus/' className='links__a'>Playstation Plus</Link>
      </p>
    </div>
  </section>
)

export default DonationLinks
