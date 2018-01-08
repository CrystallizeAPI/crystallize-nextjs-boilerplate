import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Link from 'next/link';

import Header from '../components/header';

describe('With Enzyme', () => {
  const shopName = 'My awesome shop';
  it(`Header name shows "${shopName}"`, () => {
    const header = shallow(<Header shopName={shopName} />);

    expect(header.find('.header__shop-name').text()).toEqual(shopName);
  });

  it(`First header links to root`, () => {
    const header = shallow(<Header shopName={shopName} />);

    expect(
      header
        .find(Link)
        .first()
        .props().href
    ).toEqual('/');
  });
});

// describe('With Snapshot Testing', () => {
//   it('App shows "Welcome to your Crystallize shop!"', () => {
//     const component = renderer.create(<App />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });
