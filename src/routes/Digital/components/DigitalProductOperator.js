import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

import './DigitalProductOperator.scss'
import AsLogo from '../assets/operator/as.png'
import AxisLogo from '../assets/operator/axis.png'
import BoltLogo from '../assets/operator/bolt.png'
import BpjsKesehatanLogo from '../assets/operator/bpjs_kesehatan.png'
import GarenaLogo from '../assets/operator/garena.png'
import GemscoolLogo from '../assets/operator/gemscool.png'
import GoogleGiftCardLogo from '../assets/operator/google_gift_card.png'
import Im3Logo from '../assets/operator/im3.png'
import ItunesLogo from '../assets/operator/itunes.png'
import LytoLogo from '../assets/operator/lyto.png'
import MegaxusLogo from '../assets/operator/megaxus.png'
import MentariLogo from '../assets/operator/mentari.png'
import PlnLogo from '../assets/operator/pln.png'
import SimpatiLogo from '../assets/operator/simpati.png'
import SmartfrenLogo from '../assets/operator/smartfren.png'
import SteamWalletLogo from '../assets/operator/steam_wallet.png'
import TriLogo from '../assets/operator/tri.png'
import XlLogo from '../assets/operator/xl.png'

class DigitalProductOperator extends Component {
  render() {
    return (
      <div className='u-center u-py1 wrapper dp-operator__container'>
        <ul className='u-list-style-none u-mb0 u-pl0'>

          <li>
            <Link to='https://pulsa.tokopedia.com/axis/'>
              <picture>
                <img src={AxisLogo} alt='Axis' title='Axis' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/im3/'>
              <picture>
                <img src={Im3Logo} alt='Indosat - IM3' title='Indosat - IM3' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/bolt/'>
              <picture>
                <img src={BoltLogo} alt='Bolt' title='Bolt' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/3/'>
              <picture>
                <img src={TriLogo} alt='Tri' title='Tri' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/xl/'>
              <picture>
                <img src={XlLogo} alt='XL' title='XL' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/token-listrik/'>
              <picture>
                <img src={PlnLogo} alt='Token Listrik' title='Token Listrik' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/smartfren/'>
              <picture>
                <img src={SmartfrenLogo} alt='Smartfren' title='Smartfren' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/simpati/'>
              <picture>
                <img src={SimpatiLogo} alt='Telkomsel - Simpati' title='Telkomsel - Simpati' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/bpjs-kesehatan/'>
              <picture>
                <img src={BpjsKesehatanLogo} alt='Kesehatan' title='Kesehatan' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/as/'>
              <picture>
                <img src={AsLogo} alt='Telkomsel - As' title='Telkomsel - As' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/mentari/'>
              <picture>
                <img src={MentariLogo} alt='Indosat - Mentari' title='Indosat - Mentari' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/steam/'>
              <picture>
                <img src={SteamWalletLogo} alt='Steam Wallet' title='Steam Wallet' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/google-play/'>
              <picture>
                <img src={GoogleGiftCardLogo} alt='Google Play' title='Google Play' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/garena/'>
              <picture>
                <img src={GarenaLogo} alt='Garena' title='Garena' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/gemscool/'>
              <picture>
                <img src={GemscoolLogo} alt='Gemscool' title='Gemscool' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/lyto/'>
              <picture>
                <img src={LytoLogo} alt='Lyto' title='Lyto' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/megaxus/'>
              <picture>
                <img src={MegaxusLogo} alt='Megaxus' title='Megaxus' />
              </picture>
            </Link>
          </li>

          <li>
            <Link to='https://pulsa.tokopedia.com/itunes/'>
              <picture>
                <img src={ItunesLogo} alt='ITunes' title='ITunes' />
              </picture>
            </Link>
          </li>

        </ul>
      </div>
    )
  }
}

export default DigitalProductOperator
