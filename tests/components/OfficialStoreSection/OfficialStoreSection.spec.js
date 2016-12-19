import React from 'react'
import { shallow } from 'enzyme'

import OfficialStoreSection from 'components/OfficialStoreSection'
import TextHeader from 'components/TextHeader'

describe('(Component) OfficialStoreSection', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<OfficialStoreSection />)
  })

  it('should has one multiple img element', () => {
    // const wrapper = shallow(<OfficialStoreSection />);
    expect(wrapper.find('.u-col').length).to.be.least(1)
    expect(wrapper.find('img').length).to.be.least(1)
  })

  it('should has a text header component', () => {
    expect(wrapper.contains(
      <TextHeader textType={1}>
        Official Store
      </TextHeader>)
    ).to.be.true
  })
})
