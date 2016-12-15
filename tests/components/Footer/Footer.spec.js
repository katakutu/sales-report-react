import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import Footer from 'components/Footer';

describe('(Component) Footer', () => {
  it('should has two <img>', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('img')).to.have.length(2);
  });
});
