const RechargeAPI = require('./../../api-consumer/api/Pulsa/RechargeAPI')

const RECHARGE_ERROR = []

function getOperatorList () {
  const api = new RechargeAPI()

  return api.getOperatorList()
    .then(response => {
      if (!response || !response['data']) {
        return RECHARGE_ERROR
      }

      return response['data'].map(section => {
        return {
          id: section['id'],
          name: section['attributes']['name'],
          weight: section['attributes']['weight'],
          default_product_id: section['attributes']['default_product_id'],
          image: section['attributes']['image'],
          slug: section['attributes']['slug'],
          show_product_list: section['attributes']['rule']['show_product_list_page']
        }
      })
    })
    .catch(error => {
      console.error(`Error getting recharge operator list: ${error.message}`)
      return RECHARGE_ERROR
    })
}

function getProductList () {
  const api = new RechargeAPI()

  return api.getProductList()
    .then(response => {
      if (!response || !response['data']) {
        return RECHARGE_ERROR
      }

      return response['data'].map(section => {
        return {
          id: section['id'],
          category_id: section['relationships']['category']['data']['id'],
          operator_id: section['relationships']['operator']['data']['id'],
          status: section['attributes']['status'],
          price_plain: section['attributes']['price_plain'],
          desc: section['attributes']['desc'],
          detail: section['attributes']['detail'],
          price: section['attributes']['price']
        }
      })
    })
    .catch(error => {
      console.error(`Error getting recharge product list: ${error.message}`)
      return RECHARGE_ERROR
    })
}

function getCategoryList () {
  const api = new RechargeAPI()

  return api.getCategoryList()
    .then(response => {
      if (!response || !response['data']) {
        return RECHARGE_ERROR
      }

      return response['data'].map(section => {
        return {
          id: section['id'],
          name: section['attributes']['name'],
          slug: section['attributes']['slug'],
          icon: section['attributes']['icon']
        }
      })
    })
    .catch(error => {
      console.error(`Error getting recharge category list: ${error.message}`)
      return RECHARGE_ERROR
    })
}

function getBannerList () {
  const api = new RechargeAPI()

  return api.getBannerList()
    .then(response => {
      if (!response || !response['data']) {
        return RECHARGE_ERROR
      }

      return response['data'].map(section => {
        return {
          id: section['id'],
          image_url: section['attributes']['file_name'],
          redirect_url: section['attributes']['img_url'],
          subtitle: section['attributes']['subtitle'],
          title: section['attributes']['title']
        }
      })
    })
    .catch(error => {
      console.error(`Error getting recharge category list: ${error.message}`)
      return RECHARGE_ERROR
    })
}

module.exports = {
  getOperatorList: getOperatorList,
  getProductList: getProductList,
  getCategoryList: getCategoryList,
  getBannerList: getBannerList
}
