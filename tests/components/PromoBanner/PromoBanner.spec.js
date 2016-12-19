import React from 'react'
import { mount } from 'enzyme'

import PromoBanner from 'components/PromoBanner'

describe('(Component) PromoBanner', () => {
  it('should has one <img /> element', () => {
    const wrapper = mount(
      <PromoBanner
        imageUrl='https://placehold.it/414x90'
        targetUrl='https://tokopedia.com'
        imageAlt='Lorem ipsum' />
    )
    // wrapper.setProps({
    //   imageUrl: `https://placehold.it/414x90`,
    //   targetUrl: `https://tokopedia.com`,
    //   imageAlt: `Lorem ipsum`
    // });
    expect(wrapper.find('img').length).to.be.equal(1)
    expect(wrapper.props().imageUrl).to.equal(`https://placehold.it/414x90`)
  })
})
