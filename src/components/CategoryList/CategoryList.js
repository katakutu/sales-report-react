import React from 'react'

import { HOSTNAME } from '../../constants'

import './CategoryList.scss'
import TextHeader from '../../components/TextHeader'
import iconFashion from './assets/icon-fashion.png'
import iconOtomotif from './assets/icon-otomotif.png'
import iconKecantikan from './assets/icon-kecantikan.png'
import iconPakaian from './assets/icon-pakaian.png'
import iconRumahTangga from './assets/icon-rumahtangga.png'
import iconKesehatan from './assets/icon-kesehatan.png'
import iconOlahraga from './assets/icon-olahraga.png'
import iconDapur from './assets/icon-dapur.png'
import iconHanphone from './assets/icon-handphone.png'
import iconElektronik from './assets/icon-elektronik.png'
import iconKomputer from './assets/icon-komputer.png'
import iconKamera from './assets/icon-kamera.png'
import iconLaptop from './assets/icon-laptop.png'
import iconSoftware from './assets/icon-software.png'
import iconMainan from './assets/icon-mainan.png'
import iconMakanan from './assets/icon-makanan.png'
import iconPerawatanBayi from './assets/icon-perawatanbayi.png'
import iconSouvenir from './assets/icon-souvenir.png'
import iconOffice from './assets/icon-office.png'
import iconBuku from './assets/icon-buku.png'
import iconFilm from './assets/icon-film.png'
import iconProdukLain from './assets/icon-produklain.png'
import iconPulsa from './assets/icon-pulsa.png'
import iconSaldo from './assets/icon-saldo.png'
import iconPaketData from './assets/icon-paketdata.png'
import iconBpjs from './assets/icon-bpjs.png'
import iconTokenListrik from './assets/icon-tokenlistrik.png'
import iconTiket from './assets/icon-tiket.png'

const utm = '?utm_source=mobile&utm_medium=categories%20after%20log%20in'

export const CategoryList = () => (
  <div className='u-clearfix'>
    <div className='category-list__holder u-clearfix'>
      <TextHeader textType={1}>
        Gaya Hidup
      </TextHeader>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=79`}>
            <img src={iconFashion} alt='Logo kategori Fashion Aksesoris' />
            <span className='category-list__name'>Fashion Aksesoris</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=63`}>
            <img src={iconOtomotif} alt='Logo kategori Otomotif' />
            <span className='category-list__name'>Otomotif</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=61`}>
            <img src={iconKecantikan} alt='Logo kategori Kecantikan' />
            <span className='category-list__name'>Kecantikan</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=78`}>
            <img src={iconPakaian} alt='Logo kategori Pakaian' />
            <span className='category-list__name'>Pakaian</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=984`}>
            <img src={iconRumahTangga} alt='Logo kategori Rumah Tangga' />
            <span className='category-list__name'>Rumah Tangga</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=715`}>
            <img src={iconKesehatan} alt='Logo kategori Kesehatan' />
            <span className='category-list__name'>Kesehatan</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=62`}>
            <img src={iconOlahraga} alt='Logo kategori Olahraga' />
            <span className='category-list__name'>Olahraga</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=983`}>
            <img src={iconDapur} alt='Logo kategori Dapur' />
            <span className='category-list__name'>Dapur</span>
          </a>
        </div>
      </div>
    </div>

    <div className='category-list__holder u-clearfix'>
      <TextHeader textType={1}>
        Teknologi
      </TextHeader>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=65`}>
            <img src={iconHanphone} alt='Logo kategori Handphone dan Tablet' />
            <span className='category-list__name'>Handphone &amp; Tablet</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=60`}>
            <img src={iconElektronik} alt='Logo kategori Elektronik' />
            <span className='category-list__name'>Elektronik</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=297`}>
            <img src={iconKomputer} alt='Logo kategori Komputer dan Aksesoris' />
            <span className='category-list__name'>Komputer &amp; Aksesoris</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=578`}>
            <img src={iconKamera} alt='Logo kategori Kamera, Foto, dan Video' />
            <span className='category-list__name'>Kamera, Foto, &amp; Video</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=288`}>
            <img src={iconLaptop} alt='Logo kategori Laptop dan Aksesoris' />
            <span className='category-list__name'>Laptop &amp; Aksesoris</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/p/software`}>
            <img src={iconSoftware} alt='Logo kategori Software' />
            <span className='category-list__name'>Software</span>
          </a>
        </div>
      </div>
    </div>

    <div className='category-list__holder u-clearfix'>
      <TextHeader textType={1}>
        Kategori lain
      </TextHeader>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=55`}>
            <img src={iconMainan} alt='Logo kategori Mainan dan Hobi' />
            <span className='category-list__name'>Mainan &amp; Hobi</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=35`}>
            <img src={iconMakanan} alt='Logo kategori Makanan dan Minuman' />
            <span className='category-list__name'>Makanan &amp; Minuman</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=56`}>
            <img src={iconPerawatanBayi} alt='Logo kategori Perawatan Bayi' />
            <span className='category-list__name'>Perawatan Bayi</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=54`}>
            <img src={iconSouvenir} alt='Logo kategori Souvenir' />
            <span className='category-list__name'>Souvenir</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=642`}>
            <img src={iconOffice} alt='Logo kategori Office dan Stationary' />
            <span className='category-list__name'>Office &amp; Stationary</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=8`}>
            <img src={iconBuku} alt='Logo kategori Buku' />
            <span className='category-list__name'>Buku</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/all-category.pl?d=57`}>
            <img src={iconFilm} alt='Logo kategori Film, Musik, dan Game' />
            <span className='category-list__name'>Film, Musik, &amp; Game</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`${HOSTNAME}/p/produk-lainnya`}>
            <img src={iconProdukLain} alt='Logo kategori Produk Lainnya' />
            <span className='category-list__name'>Produk Lainnya</span>
          </a>
        </div>
      </div>
    </div>

    <div className='category-list__holder u-clearfix'>
      <TextHeader textType={1}>
        Pembayaran &amp; Top up
      </TextHeader>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`https://pulsa.tokopedia.com/${utm}&utm_campaign=pulsa%20icon`}>
            <img src={iconPulsa} alt='Logo kategori Pulsa' />
            <span className='category-list__name'>Pulsa</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`https://pulsa.tokopedia.com/saldo/${utm}&utm_campaign=token%20listrik%20icon`}>
            <img src={iconSaldo} alt='Logo kategori Saldo' />
            <span className='category-list__name'>Saldo</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`https://pulsa.tokopedia.com/paket-data/${utm}&utm_campaign=paket%20data%20icon`}>
            <img src={iconPaketData} alt='Logo kategori Paket Data' />
            <span className='category-list__name'>Paket Data</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`https://pulsa.tokopedia.com/bpjs-kesehatan/${utm}&utm_campaign=bpjs%20kesehatan%20icon`}>
            <img src={iconBpjs} alt='Logo kategori BPJS' />
            <span className='category-list__name'>BPJS</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`https://pulsa.tokopedia.com/token-listrik/${utm}&utm_campaign=token%20listrik%20icon`}>
            <img src={iconTokenListrik} alt='Logo kategori Token Listrik' />
            <span className='category-list__name'>Token Listrik</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href={`https://tiket.tokopedia.com/kereta-api/${utm}&utm_campaign=tiket%20kereta%20icon`}>
            <img src={iconTiket} alt='Logo kategori Tiket' />
            <span className='category-list__name'>Tiket</span>
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default CategoryList
