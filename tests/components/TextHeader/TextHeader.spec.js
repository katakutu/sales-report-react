import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import TextHeader from 'components/TextHeader';

describe('(Component) TextHeader', () => {
  it('should has one header element', () => {
    const wrapper = shallow(<TextHeader textType={1}>A Header</TextHeader>);
    expect(wrapper.find('h1')).to.have.length(1);
    
    wrapper.setProps({
      textType: 4
    });
    expect(wrapper.find('h1')).to.have.length(0);
    expect(wrapper.find('h4')).to.have.length(1);
  });
});
