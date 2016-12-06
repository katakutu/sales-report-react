export const GA_PROPERTY_ID = 'UA-9801603-6'

let hostname = 'https://m-staging.tokopedia.com'
let sites = {
  Pulsa: 'https://pulsa-staging.tokopedia.com',
  Tiket: 'https://tiket-staging.tokopedia.com'
}
let gtmContainerID = 'GTM-T8MQ8Z'

if (__TEST__) {
  hostname = 'https://m-staging.tokopedia.com'
  sites = {
    Pulsa: 'https://pulsa-staging.tokopedia.com',
    Tiket: 'https://tiket-staging.tokopedia.com'
  }
  gtmContainerID = 'GTM-T8MQ8Z'
} else if (__PROD__) {
  hostname = 'https://m.tokopedia.com'
  sites = {
    Pulsa: 'https://pulsa.tokopedia.com',
    Tiket: 'https://tiket.tokopedia.com'
  }
  gtmContainerID = 'GTM-WD6SLP'
}

export const HOSTNAME = hostname
export const SITES = sites
export const GTM_CONTAINER_ID = gtmContainerID
