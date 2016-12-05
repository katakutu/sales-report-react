export const GA_PROPERTY_ID = 'UA-9801603-6'

let hostname = 'https://m-staging.tokopedia.com'
let gtmContainerID = 'GTM-T8MQ8Z'

if (__TEST__) {
  hostname = 'https://m-staging.tokopedia.com'
  gtmContainerID = 'GTM-T8MQ8Z'
} else if (__PROD__) {
  hostname = 'https://m.tokopedia.com'
  gtmContainerID = 'GTM-WD6SLP'
}

export const HOSTNAME = hostname
export const GTM_CONTAINER_ID = gtmContainerID
