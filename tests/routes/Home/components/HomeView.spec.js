import React from 'react'
import { HomeView } from 'routes/Home/components/HomeView'
import { render } from 'enzyme'

describe('(View) Home', () => {
  let _component

  beforeEach(() => {
    _component = render(<HomeView />)
  })

  /* TODO: Write the right test after homepage is finished
  it('Renders a welcome message', () => {
    const welcome = _component.find('h4')
    expect(welcome).to.exist
    expect(welcome.text()).to.match(/Welcome!/)
  })
  */
})
