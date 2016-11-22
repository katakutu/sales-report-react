import HMACToped from 'lib/hmac/HMACToped'

describe('HMACToped', () => {
  describe('#generate', () => {
    it('throws TypeError when method is not GET or POST', () => {
      let hmac = HMACToped.generate.bind(
                'key', 'PUT', 'path', new Date(), 'hashParam', 'hashHeader'
            )
      expect(hmac).to.throw(TypeError)
    })

    it('throws TypeError when date is invalid', () => {
      let hmac = HMACToped.generate.bind(
                'key', 'GET', 'path', new Date('something'), 'hashParam', 'hashHeader'
            )
      expect(hmac).to.throw(TypeError)
    })

    it('throws TypeError when date is not a date', () => {
      let hmac = HMACToped.generate.bind(
                'key', 'GET', 'path', 'string', 'hashParam', 'hashHeader'
            )
      expect(hmac).to.throw(TypeError)
    })

    it('valid call should return string', () => {
      let validHMAC = HMACToped.generate(
                'key', 'GET', 'path', new Date(), 'hashParam', 'hashHeader'
            )

      expect(validHMAC).to.be.a('string')
    })

    it('returns string that starts with "TKPD Tokopedia:" when method is GET or POST', () => {
      let hmacGET = HMACToped.generate(
                'key', 'GET', 'path', new Date(), 'hashParam', 'hashHeader'
            )
      let hmacPOST = HMACToped.generate(
                'key', 'GET', 'path', new Date(), 'hashParam', 'hashHeader'
            )

      expect(hmacGET).to.startsWith('TKPD Tokopedia:')
      expect(hmacPOST).to.startsWith('TKPD Tokopedia:')
    })
  })
})
