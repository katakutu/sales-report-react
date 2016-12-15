import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Ticker from 'components/Ticker';
// import Foo from './Foo';

describe('(Component) Ticker', () => {
  it('should has at least one <div> element', () => {
    const wrapper = shallow(<Ticker />);
    expect(wrapper.find('div').length).to.be.least(1);
    // const wrapper = mount(<Foo bar="baz" />);
    // expect(wrapper.props().bar).to.equal('baz');
    // wrapper.setProps({ bar: 'foo' });
    // expect(wrapper.props().bar).to.equal('foo');
  });

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = mount(
  //     <Foo onButtonClick={onButtonClick} />
  //   );
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick).to.have.property('callCount', 1);
  // });

  // it('calls componentDidMount', () => {
  //   sinon.spy(Foo.prototype, 'componentDidMount');
  //   const wrapper = mount(<Foo />);
  //   expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
  //   Foo.prototype.componentDidMount.restore();
  // });
});