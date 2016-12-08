import TopedAceAPI from 'lib/api/Search/TopedAceAPI'

describe('TopedAceAPI', () => {
  let _ace
  beforeEach(() => {
    _ace = new TopedAceAPI()
  })

  describe('#Available functions', function () {
    // TODO: mockup for http request
    it('Should has these functions', () => {
      expect(_ace.universeSearch).to.exist
      expect(_ace.autocomplete).to.exist
      expect(_ace.searchCatalog).to.exist
      expect(_ace.searchShop).to.exist
      expect(_ace.spellCheck).to.exist
      expect(_ace.priceRange).to.exist
      expect(_ace.catalogShopList).to.exist
      expect(_ace.popularSearch).to.exist
      expect(_ace.recentSearch).to.exist
      expect(_ace.dynamicAttributes).to.exist
    })
  })
})
