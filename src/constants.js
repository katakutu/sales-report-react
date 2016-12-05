export const GA_PROPERTY_ID = 'UA-9801603-6'

let hostname = 'https://m-staging.tokopedia.com'
if (__TEST__) {
  hostname = 'https://m-staging.tokopedia.com'
} else if (__PROD__) {
  hostname = 'https://m.tokopedia.com'
}

export const HOSTNAME = hostname
