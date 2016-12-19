const TopedHadesAPI = require('./../../api-consumer/api/Hades/TopedHadesAPI')

const MAIN_CATEGORY = {
  'Fashion \u0026 Aksesoris': 'Gaya Hidup',
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

function getMainPageCategories () {
  const api = new TopedHadesAPI()

  return api.allCategories().then(response => {
    if (!response['data']) {
      return []
    }

    const categories = response['data']['categories'] || []
    let result = {
      'Gaya Hidup': [],
      'Teknologi': [],
      'Kategori Lain': []
    }

    categories.forEach(cat => {
      if (MAIN_CATEGORY[cat['name']]) {
        result[MAIN_CATEGORY[cat['name']]].push({
          name: cat['name'],
          identifier: cat['identifier']
        })
      }
    })

    return Object.keys(result).map(k => { return { name: k, items: result[k] } })
  })
}

module.exports = {
  getMainPageCategories: getMainPageCategories
}
