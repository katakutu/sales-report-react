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
  <div className="u-clearfix">
    <div className="category-list__holder u-clearfix">
      <div className="category-list__title">
        Gaya Hidup
        <div className="category-list__title-line"></div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconFashion} />
            <span className="category-list__name">Fashion Aksesoris</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconOtomotif} />
            <span className="category-list__name">Otomotif</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconKecantikan} />
            <span className="category-list__name">Kecantikan</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconPakaian} />
            <span className="category-list__name">Pakaian</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconRumahTangga} />
            <span className="category-list__name">Rumah Tangga</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconKesehatan} />
            <span className="category-list__name">Kesehatan</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconOlahraga} />
            <span className="category-list__name">Olahraga</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconDapur} />
            <span className="category-list__name">Dapur</span>
        </div>
      </div>
    </div>

    <div className="category-list__holder u-clearfix">
      <div className="category-list__title">
        Teknologi
        <div className="category-list__title-line"></div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconHanphone} />
            <span className="category-list__name">Handphone & Tablet</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconElektronik} />
            <span className="category-list__name">Elektronik</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconKomputer} />
            <span className="category-list__name">Komputer & Aksesoris</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconKamera} />
            <span className="category-list__name">Kamera, Foto, & Video</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconLaptop} />
            <span className="category-list__name">Laptop & Aksesoris</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconSoftware} />
            <span className="category-list__name">Software</span>
        </div>
      </div>
    </div>

    <div className="category-list__holder u-clearfix">
      <div className="category-list__title">
        Kategori lain
        <div className="category-list__title-line"></div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconMainan} />
            <span className="category-list__name">Mainan & Hobi</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconMakanan} />
            <span className="category-list__name">Makanan & Minuman</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconPerawatanBayi} />
            <span className="category-list__name">Perawatan Bayi</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconSouvenir} />
            <span className="category-list__name">Souvenir</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconOffice} />
            <span className="category-list__name">Office & Stationery</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconBuku} />
            <span className="category-list__name">Buku</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconFilm} />
            <span className="category-list__name">Film, Musik, & Game</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconProdukLain} />
            <span className="category-list__name">Produk lainnya</span>
        </div>
      </div>
    </div>

    <div className="category-list__holder u-clearfix">
      <div className="category-list__title">
        Pembayaran & Top up
        <div className="category-list__title-line"></div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconPulsa} />
            <span className="category-list__name">Pulsa</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconSaldo} />
            <span className="category-list__name">Saldo</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconPaketData} />
            <span className="category-list__name">Paket Data</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconBpjs} />
            <span className="category-list__name">BPJS</span>
        </div>
      </div>

      <div className="u-col u-col-12 category-list__box">
        <div className="u-col u-col-6 category-list__content">
            <img src={iconTokenListrik} />
            <span className="category-list__name">Token Listrik</span>
        </div>
        <div className="u-col u-col-6 category-list__content">
            <img src={iconTiket} />
            <span className="category-list__name">Tiket</span>
        </div>
      </div>
    </div>
  </div>
)

export default CategoryList
