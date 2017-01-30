let content = {
  'pulsa': {
    title: 'Beli Pulsa'
  },
  'paket-data': {
    title: 'Beli Paket Data',
    note: 'Harga Kuota 360MB - 600MB (sesuai zona terkait). Lihat detailnya di sini.'
  },
  'bpjs': {
    title: 'Bayar BPJS Kesehatan dan Ketenagakerjaan Kamu Disini',
    radio: [
      {
        id: 'bpjs-kesehatan',
        name: 'bpjs',
        text: 'Kesehatan',
        checked: true
      },
      {
        id: 'bpjs-ketenagakerjaan',
        name: 'bpjs',
        text: 'Ketenagakerjaan'
      }
    ]
  },
  'pln': {
    title: 'Beli Token atau Bayar Tagihan Listrik',
    radio: [
      {
        id: 'pln-token',
        name: 'pln',
        text: 'Token Listrik',
        checked: true
      },
      {
        id: 'pln-tagihan',
        name: 'pln',
        text: 'Tagihan Listrik'
      }
    ],
    /* eslint-disable max-len */
    note: 'Token Listrik: Seluruh pembelian Token Listrik pada pukul 23:00 - 00.59 WIB akan kami proses pada pukul 01.00 saat Server PLN aktif kembali',
    note2: [
      {
        text: '1. Pembayaran tagihan listrik tidak dapat dilakukan pada pukul 23.45-00.30 WIB sesuai dengan ketentuan PLN'
      },
      {
        text: '2. Proses verifikasi pembayaran membutuhkan waktu maksimum 2x24 jam'
      },
      {
        text: '3. Total tagihan yang tertera sudah termasuk denda (bila ada)'
      },
      {
        text: '4. Biaya admin adalah Rp 2500 per tagihan / bulan'
      }
    ]
    /* eslint-enable max-len */
  },
  'saldo': {
    title: 'Isi saldo untuk berbelanja di Tokopedia'
  },
  'game': {
    title: 'Beli Voucher Game',
    note: 'Voucher Google Play (USD) hanya dapat diredeem dengan akun region U.S.',
    products: [
      {
        text: 'Steam Wallet'
      },
      {
        text: 'Google Play'
      },
      {
        text: 'Garena'
      },
      {
        text: 'Gemscool'
      },
      {
        text: 'Lyto'
      },
      {
        text: 'Megaxus'
      },
      {
        text: 'iTunes'
      },
      {
        text: 'DOTA 2'
      },
      {
        text: 'Battlenet'
      }
    ]
  },
  'air': {
    title: 'Bayar Tagihan Air',
    products: [
      {
        text: 'AETRA JAKARTA'
      },
      {
        text: 'PALYJA JAKARTA'
      }
    ]
  },
  'tv-kabel': {
    title: 'Bayar TV Kabel kamu di Tokopedia',
    options: [
      {
        value: '1',
        name: 'BigTv'
      },
      {
        value: '2',
        name: 'Indovision'
      },
      {
        value: '3',
        name: 'Transvision'
      },
      {
        value: '4',
        name: 'Indihome'
      }
    ]
  },
  'donasi': {
    title: 'Salurkan Donasi Untuk Berbagi Dengan Sesama',
    options: [
      {
        value: '1',
        name: 'Rp 25.000'
      },
      {
        value: '2',
        name: 'Rp 50.000'
      },
      {
        value: '3',
        name: 'Rp 100.000'
      },
      {
        value: '4',
        name: 'Rp 200.000'
      },
      {
        value: '5',
        name: 'Rp 300.000'
      }
    ]
  },
  'postpaid': {
    title: 'Bayar Tagihan Pascabayar',
    options: [
      {
        value: '1',
        name: 'Telkomsel - Halo'
      },
      {
        value: '2',
        name: 'Indosat - Matrix'
      },
      {
        value: '3',
        name: 'Tri Pascabayar'
      },
      {
        value: '4',
        name: 'XL Prioritas'
      },
      {
        value: '5',
        name: 'Smartfren Pascabayar'
      }
    ]
  },
  'multifinance': {
    title: 'Bayar angsuran kredit kamu di Tokopedia',
    options: [
      {
        value: '1',
        name: 'Radana Finance'
      },
      {
        value: '2',
        name: 'Bima Multi Finanace'
      },
      {
        value: '3',
        name: 'MPM Finance'
      },
      {
        value: '4',
        name: 'Mega Auto Finance'
      },
      {
        value: '5',
        name: 'Mega Central Finance'
      }
    ]
  },
  'telephone': {
    title: 'Bayar tagihan telepon rumah Anda di Tokopedia'
  }
}

export const DCONTENT = content
