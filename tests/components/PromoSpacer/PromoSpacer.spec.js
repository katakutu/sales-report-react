import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import PromoSpacer from 'components/Carousel';

describe('(Component) PromoSpacer', () => {
  it('should has one <a> element', () => {
    const wrapper = shallow(<PromoSpacer />);
    expect(wrapper.find('a').length).to.be.equal(1);
  });
});
