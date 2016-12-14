import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import BottomNav from 'components/BottomNav';

describe('(Component) BottomNav', () => {
  it('should has four bottom-nav__grid element', () => {
    const wrapper = shallow(<BottomNav />);
    expect(wrapper.find('.bottom-nav__grid').length).to.be.least(1);
    expect(wrapper.find('.bottom-nav__link').length).to.be.least(1);
    expect(wrapper.contains(<span className='u-mx-auto'>Home</span>)).to.be.true;
	expect(wrapper.contains(<span className='u-mx-auto'>Hotlist</span>)).to.be.true;
	expect(wrapper.contains(<span>Wishlist</span>)).to.be.true;
	expect(wrapper.contains(<span>Masuk</span>)).to.be.true;

  });
});
