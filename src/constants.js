export const GA_PROPERTY_ID = 'UA-9801603-6'

let hostname = 'https://m-staging.tokopedia.com'
if (__TEST__) {
  config = 'https://m-staging.tokopedia.com'
} else if (__PROD__) {
  config = 'https://m.tokopedia.com'
}

export const HOSTNAME = hostname