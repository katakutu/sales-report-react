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
          minimum_length: section['attributes']['minimum_length'],
          maximum_length: section['attributes']['maximum_length'],
          show_product_list: section['attributes']['rule']['show_product_list_page'],
          show_product: section['attributes']['rule']['show_product'],
          product_text: section['attributes']['rule']['product_text'],
          show_price: section['attributes']['rule']['show_price']
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
          price: section['attributes']['price'],
          promo: section['attributes']['promo']
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
          icon: section['attributes']['icon'],
          validate_prefix: section['attributes']['validate_prefix'],
          instant_checkout_available: section['attributes']['instant_checkout_available'],
          default_operator_id: section['attributes']['default_operator_id'],
          client_number: section['attributes']['client_number'],
          show_operator: section['attributes']['show_operator'],
          operator_label: section['attributes']['operator_label']
        }
      })
    })
    .catch(error => {
      console.error(`Error getting recharge category list: ${error.message}`)
      return RECHARGE_ERROR
    })
}

function getPrefixList () {
  const api = new RechargeAPI()

  return api.getPrefixList()
    .then(response => {
      if (!response || !response['data']) {
        return RECHARGE_ERROR
      }

      return response['data'].map(section => {
        return {
          id: section['operator_id'],
          prefix: section['prefix']
        }
      })
    })
    .catch(error => {
      console.error(`Error getting recharge prefix list: ${error.message}`)
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
  getPrefixList: getPrefixList,
  getBannerList: getBannerList
}
