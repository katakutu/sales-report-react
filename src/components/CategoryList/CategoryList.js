import React from 'react'
import './CategoryList.scss'
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

export const CategoryList = () => (
  <div className='u-clearfix'>
    <div className='category-list__holder u-clearfix'>
      <div className='category-list__title'>
        Gaya Hidup
        <div className='category-list__title-line' />
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconFashion} />
            <span className='category-list__name'>Fashion Aksesoris</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconOtomotif} />
            <span className='category-list__name'>Otomotif</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconKecantikan} />
            <span className='category-list__name'>Kecantikan</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconPakaian} />
            <span className='category-list__name'>Pakaian</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconRumahTangga} />
            <span className='category-list__name'>Rumah Tangga</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconKesehatan} />
            <span className='category-list__name'>Kesehatan</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconOlahraga} />
            <span className='category-list__name'>Olahraga</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconDapur} />
            <span className='category-list__name'>Dapur</span>
          </a>
        </div>
      </div>
    </div>

    <div className='category-list__holder u-clearfix'>
      <div className='category-list__title'>
        Teknologi
        <div className='category-list__title-line' />
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconHanphone} />
            <span className='category-list__name'>Handphone & Tablet</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconElektronik} />
            <span className='category-list__name'>Elektronik</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconKomputer} />
            <span className='category-list__name'>Komputer & Aksesoris</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconKamera} />
            <span className='category-list__name'>Kamera, Foto, & Video</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconLaptop} />
            <span className='category-list__name'>Laptop & Aksesoris</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconSoftware} />
            <span className='category-list__name'>Software</span>
          </a>
        </div>
      </div>
    </div>

    <div className='category-list__holder u-clearfix'>
      <div className='category-list__title'>
        Kategori lain
        <div className='category-list__title-line' />
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconMainan} />
            <span className='category-list__name'>Mainan & Hobi</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconMakanan} />
            <span className='category-list__name'>Makanan & Minuman</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconPerawatanBayi} />
            <span className='category-list__name'>Perawatan Bayi</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconSouvenir} />
            <span className='category-list__name'>Souvenir</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconOffice} />
            <span className='category-list__name'>Office & Stationery</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconBuku} />
            <span className='category-list__name'>Buku</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconFilm} />
            <span className='category-list__name'>Film, Musik, & Game</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconProdukLain} />
            <span className='category-list__name'>Produk lainnya</span>
          </a>
        </div>
      </div>
    </div>

    <div className='category-list__holder u-clearfix'>
      <div className='category-list__title'>
        Pembayaran & Top up
        <div className='category-list__title-line' />
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconPulsa} />
            <span className='category-list__name'>Pulsa</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconSaldo} />
            <span className='category-list__name'>Saldo</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconPaketData} />
            <span className='category-list__name'>Paket Data</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconBpjs} />
            <span className='category-list__name'>BPJS</span>
          </a>
        </div>
      </div>

      <div className='u-col u-col-12 category-list__box'>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconTokenListrik} />
            <span className='category-list__name'>Token Listrik</span>
          </a>
        </div>
        <div className='u-col u-col-6 category-list__content'>
          <a href='#'>
            <img src={iconTiket} />
            <span className='category-list__name'>Tiket</span>
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default CategoryList
