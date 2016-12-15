import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import ToastNotification from 'components/ToastNotification';
// import Foo from './Foo';

describe('(Component) ToastNotification', () => {
  it('should has eight static propTypes', () => {
    expect(ToastNotification).to.have.deep.property('propTypes.children')
    expect(ToastNotification).to.have.deep.property('propTypes.className')
    expect(ToastNotification).to.have.deep.property('propTypes.isActive')
    expect(ToastNotification).to.have.deep.property('propTypes.label')
    expect(ToastNotification).to.have.deep.property('propTypes.onClick')
    expect(ToastNotification).to.have.deep.property('propTypes.onTimeout')
    expect(ToastNotification).to.have.deep.property('propTypes.seqNo')
    expect(ToastNotification).to.have.deep.property('propTypes.timeout')
  });

  it('should has two static defaultTypes', () => {
    expect(ToastNotification).to.have.deep.property('defaultProps.seqNo', 1)
    expect(ToastNotification).to.have.deep.property('defaultProps.timeout', 2000)
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