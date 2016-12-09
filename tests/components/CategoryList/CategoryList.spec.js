import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import CategoryList from 'components/CategoryList';
import TextHeader from 'components/TextHeader';

describe('(Component) CategoryList', () => {
  it('should has required elements', () => {
    const wrapper = shallow(<CategoryList />);
    expect(wrapper.find('.category-list__holder').length).to.be.least(1);
    expect(wrapper.contains(<TextHeader textType={1}>Gaya Hidup</TextHeader>)).to.be.true;
  });
});
