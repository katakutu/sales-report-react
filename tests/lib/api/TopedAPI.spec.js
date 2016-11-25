import TopedHMACAPI from 'lib/api/TopedHMACAPI'

describe('TopedHMACAPI', () => {
  let _api

  beforeEach(() => {
    _api = new TopedHMACAPI('no_secret_in_ba_sing_se')
  })

  describe('#generateHashParamFromObject', () => {
    let testContent = [
            { data: { 'key1': 'value1' }, result: 'key1=value1' },
            { data: { 'key1': 'value1', 'key2': 'value2' }, result: 'key1=value1&key2=value2' },
            { data: { 'k1': 1, 'k2': 2 }, result: 'k1=1&k2=2' }
    ]

    it('returns the correct result', () => {
      testContent.forEach(content => {
        let result = _api.generateHashParamFromObject(content.data)

        expect(result).to.equal(result)
      })
    })

    it('should return string', () => {
      testContent.forEach(content => {
        let result = _api.generateHashParamFromObject(content.data)

        expect(result).to.be.a('string')
      })
    })
  })

  describe('#generateFormDataFromObject', () => {
    it('should return FormData', () => {
      let testData = { 'key': 'value', 'integer': 1 }
      let result = _api.generateFormDataFromObject(testData)

      expect(result).to.be.a('FormData')
    })
  })
})
