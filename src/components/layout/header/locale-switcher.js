import { useRouter } from 'next/router';
import styled from 'styled-components';
import is from 'styled-is';

import { responsive } from 'ui';
import { useLocale, getLocaleFromName } from 'lib/app-config';

const Outer = styled.div`
  flex: 1 1 auto;
  display: inline-flex;
  margin: 0 20px;

  ${responsive.xs} {
    display: none;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0;

    ${is('$navOpen')`
      display: block;
    `};
  }

  &:hover {
    background: #efefef;
  }
`;

const SelectAsText = styled.div`
  flex: 1 1 auto;
  position: relative;
  white-space: nowrap;
  padding: 0 15px;
  display: inline-flex;
  align-items: center;
  color: #000;
  text-transform: uppercase;
  font-weight: 700;

  ${responsive.xs} {
    padding: 20px;
    font-weight: 600;
    font-size: 1.2rem;
    font-family: var(--font-family-main);
    text-transform: none;
  }

  select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    opacity: 0;
    cursor: pointer;
  }
`;

export default function LocaleSwitcher({ navOpen }) {
  const router = useRouter();
  const locale = useLocale();

  function onChange(e) {
    router.push('/', '/', { locale: e.target.value });
  }

  if (router.locales.length < 2) {
    return null;
  }

  return (
    <Outer $navOpen={navOpen}>
      <SelectAsText>
        <span>{locale.displayName}</span>
        <select onChange={onChange} defaultValue={locale.locale}>
          {router.locales.map(getLocaleFromName).map((l) => (
            <option value={l.locale} key={l.locale}>
              {l.displayName}
            </option>
          ))}
        </select>
      </SelectAsText>
    </Outer>
  );
}
