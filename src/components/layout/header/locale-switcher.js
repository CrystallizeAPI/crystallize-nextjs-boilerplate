import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useLocale, getLocaleFromName } from 'lib/app-config';

const Outer = styled.div`
  flex: 1 1 auto;
  display: inline-flex;
  margin: 0 20px;

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

export default function LocaleSwitcher() {
  const router = useRouter();
  const locale = useLocale();

  function onChange(e) {
    router.push('/', '/', { locale: e.target.value });
  }

  if (router.locales.length < 2) {
    return null;
  }

  return (
    <Outer>
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
