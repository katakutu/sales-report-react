export const GA_PROPERTY_ID = 'UA-9801603-6'

let desktopHostname = 'https://staging.tokopedia.com/?m2w'
let hostname = 'https://m-staging.tokopedia.com'
let sites = {
  Pulsa: 'https://pulsa-staging.tokopedia.com',
  Tiket: 'https://tiket-staging.tokopedia.com'
}
let gtmContainerID = 'GTM-T8MQ8Z'

if (__TEST__) {
  desktopHostname = 'https://staging.tokopedia.com/?m2w'
  hostname = 'https://m-staging.tokopedia.com'
  sites = {
    Pulsa: 'https://pulsa-staging.tokopedia.com',
    Tiket: 'https://tiket-staging.tokopedia.com'
  }
  gtmContainerID = 'GTM-T8MQ8Z'
} else if (__PROD__) {
  desktopHostname = 'https://www.tokopedia.com/?m2w'
  hostname = 'https://m.tokopedia.com'
  sites = {
    Pulsa: 'https://pulsa.tokopedia.com',
    Tiket: 'https://tiket.tokopedia.com'
  }
  gtmContainerID = 'GTM-WD6SLP'
}

export const DESKTOP_HOSTNAME = desktopHostname
export const HOSTNAME = hostname
export const SITES = sites
export const GTM_CONTAINER_ID = gtmContainerID
