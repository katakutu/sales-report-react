const TopedMojitoAPI = require('./../../api-consumer/api/Search/TopedMojitoAPI')

const MAIN_CATEGORY = {
  'Fashion \u0026 Aksesoris': 'Gaya Hidup',
  'Fashion Pria': 'Gaya Hidup',
  'Fashion Wanita': 'Gaya Hidup',
  'Fashion Muslim': 'Gaya Hidup',
  'Kecantikan': 'Gaya Hidup',
  'Rumah Tangga': 'Gaya Hidup',
  'Olahraga': 'Gaya Hidup',
  'Otomotif': 'Gaya Hidup',
  'Pakaian': 'Gaya Hidup',
  'Kesehatan': 'Gaya Hidup',
  'Dapur': 'Gaya Hidup',
  'Handphone \u0026 Tablet': 'Teknologi',
  'Komputer \u0026 Aksesoris': 'Teknologi',
  'Laptop \u0026 Aksesoris': 'Teknologi',
  'Elektronik': 'Teknologi',
  'Kamera, Foto \u0026 Video': 'Teknologi',
  'Software': 'Teknologi',
  'Mainan \u0026 Hobi': 'Kategori Lain',
  'Perawatan Bayi': 'Kategori Lain',
  'Office \u0026 Stationery': 'Kategori Lain',
  'Film, Musik \u0026 Game': 'Kategori Lain',
  'Makanan \u0026 Minuman': 'Kategori Lain',
  'Souvenir, Kado \u0026 Hadiah': 'Kategori Lain',
  'Buku': 'Kategori Lain',
  'Produk Lainnya': 'Kategori Lain'
}

function getMainPageCategories() {
  const api = new TopedMojitoAPI()

  return api.getCategory()
    .then(response => {
      if (!response || !response['data']) {
        return []
      }

      return {
        categories: response['data']['layout_sections'].map(section => {
          const key = section['title']
          return {
            name: section['title'],
            items: section['layout_rows'].map(row => {
              const id = row['url'].split('/')

              return {
                name: row['name'],
                identifier: id[id.length - 1]
              }
            })
          }

        }),
        errors: []
      }
    })
    .catch(error => {
      return {
        categories: [],
        errors: [error.name, error.message]
      }
    })
}

module.exports = {
  getMainPageCategories: getMainPageCategories
}
