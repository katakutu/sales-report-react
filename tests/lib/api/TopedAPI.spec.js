import TopedAPI from 'lib/api/TopedAPI'

describe('TopedAPI', () => {
  let _api
  beforeEach(() => {
    _api = new TopedAPI()
  })

  describe('#contentToURIParams', function () {
    let testContent = [
      { data: { 'key1': 'value1' }, result: 'key1=value1' },
      { data: { 'key1': 'value1', 'key2': 'value2' }, result: 'key1=value1&key2=value2' },
      { data: { 'k1': 1, 'k2': 2 }, result: 'k1=1&k2=2' }
    ]

    it('Should returns the correct result', () => {
      testContent.forEach(content => {
        let result = _api.contentToURIParams(content.data)

        expect(result).to.equal(result)
      })
    })

    it('Should return empty string if the parameter is not an object', () => {
      let strParam = ''
      let numParam = 0
      let arrParam = []
      let funParam = a => a + 1
      let boolParam = false
      let nullParam = null
      let udefParam

      expect(_api.contentToURIParams(strParam)).to.equal('')
      expect(_api.contentToURIParams(numParam)).to.equal('')
      expect(_api.contentToURIParams(arrParam)).to.equal('')
      expect(_api.contentToURIParams(funParam)).to.equal('')
      expect(_api.contentToURIParams(boolParam)).to.equal('')
      expect(_api.contentToURIParams(nullParam)).to.equal('')
      expect(_api.contentToURIParams(udefParam)).to.equal('')
    })
  })
})
