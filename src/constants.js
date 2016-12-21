export const GA_PROPERTY_ID = 'UA-9801603-6'

let desktopHostname = 'https://staging.tokopedia.com/?m2w'
let hostname = 'https://m-staging.tokopedia.com'
let sites = {
  Pulsa: 'https://pulsa-staging.tokopedia.com',
  Tiket: 'https://tiket-staging.tokopedia.com',
  Events: 'https://events.tokopedia.com/',
  Seller: 'https://seller.tokopedia.com/',
  Blog: 'https://blog.tokopedia.com/',
  Register: 'https://accounts-staging.tokopedia.com/register?theme=mobile'
}
let gtmContainerID = 'GTM-T8MQ8Z'

if (__TEST__) {
  desktopHostname = 'https://staging.tokopedia.com/?m2w'
  hostname = 'https://m-staging.tokopedia.com'
  sites = {
    Pulsa: 'https://pulsa-staging.tokopedia.com',
    Tiket: 'https://tiket-staging.tokopedia.com',
    Events: 'https://events.tokopedia.com/',
    Seller: 'https://seller.tokopedia.com/',
    Blog: 'https://blog.tokopedia.com/',
    Register: 'https://accounts-staging.tokopedia.com/register?theme=mobile'
  }
  gtmContainerID = 'GTM-T8MQ8Z'
} else if (__PROD__) {
  desktopHostname = 'https://www.tokopedia.com/?m2w'
  hostname = 'https://m.tokopedia.com'
  sites = {
    Pulsa: 'https://pulsa.tokopedia.com',
    Tiket: 'https://tiket.tokopedia.com',
    Events: 'https://events.tokopedia.com/',
    Seller: 'https://seller.tokopedia.com/',
    Blog: 'https://blog.tokopedia.com/',
    Register: 'https://accounts.tokopedia.com/register?theme=mobile'
  }
  gtmContainerID = 'GTM-WD6SLP'
} else if (__BETA__) {
  desktopHostname = 'https://beta.tokopedia.com/?m2w'
  hostname = 'https://m-beta.tokopedia.com'
  sites = {
    Pulsa: 'https://pulsa.tokopedia.com',
    Tiket: 'https://tiket.tokopedia.com',
    Events: 'https://events.tokopedia.com/',
    Seller: 'https://seller.tokopedia.com/',
    Blog: 'https://blog.tokopedia.com/',
    Register: 'https://accounts-beta.tokopedia.com/register?theme=mobile'
  }
  gtmContainerID = 'GTM-WD6SLP'
}

export const DESKTOP_HOSTNAME = desktopHostname
export const HOSTNAME = hostname
export const SITES = sites
export const GTM_CONTAINER_ID = gtmContainerID
