import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import PropTypeCategory from 'lib/prop-types/category';
import PropTypeTenant from 'lib/prop-types/tenant';
import { Outer, Nav, Logo } from './styles';

export default class Header extends React.PureComponent {
  static propTypes = {
    tenant: PropTypeTenant,
    categories: PropTypes.arrayOf(PropTypeCategory)
  };

  render() {
    const { categories, tenant } = this.props;
    return (
      <Outer>
        <Link href="/">
          <a>
            <Logo src={tenant.logo_url} alt={tenant.company_name} />
          </a>
        </Link>
        <Nav>
          {categories &&
            categories.map(category => (
              <Link
                href="/category"
                as={category.link}
                key={category.link}
                prefetch
              >
                <a>{category.name}</a>
              </Link>
            ))}
          <Link href="/user" prefetch>
            <a>User profile</a>
          </Link>
        </Nav>
      </Outer>
    );
  }
}
