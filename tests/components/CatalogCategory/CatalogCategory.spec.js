import React from 'react'
import { shallow } from 'enzyme'

import CatalogCategory from 'components/CatalogCategory'

describe('(Component) CatalogCategory', () => {
  const wrapper = shallow(<CatalogCategory />)
  it('should has five catalog-category__content-holder elements', () => {
    expect(wrapper.find('.catalog-category__content-holder').length).to.be.least(5)
  })
  it('should has nine catalog-category__content elements', () => {
    expect(wrapper.find('.catalog-category__content').length).to.be.least(9)
  })
})
