import { shallow } from 'enzyme';
import React from 'react';

import Link from 'next/link';

import Header from 'components/header';

const tenant = {
  company_name: 'My Crystallize shop!',
  logo_url: '//lorempixel.com/200/200'
};

describe('With Enzyme', () => {
  it(`First header links to root`, () => {
    const header = shallow(<Header tenant={tenant} />);

    expect(
      header
        .find(Link)
        .first()
        .props().href
    ).toEqual('/');
  });
});
