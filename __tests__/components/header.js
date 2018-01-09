import { shallow } from 'enzyme';
import React from 'react';

import Link from 'next/link';

import Header from 'components/header';

describe('With Enzyme', () => {
  it(`First header links to root`, () => {
    const header = shallow(<Header />);

    expect(
      header
        .find(Link)
        .first()
        .props().href
    ).toEqual('/');
  });
});
