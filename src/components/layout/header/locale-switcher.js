import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useLocale, getValidLocale } from 'lib/app-config';

const Outer = styled.div`
  display: inline-flex;
  margin: 0 20px;
`;

const SelectAsText = styled.div`
  position: relative;
  white-space: nowrap;

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
          {router.locales.map(getValidLocale).map((l) => (
            <option value={l.locale} key={l.locale}>
              {l.displayName}
            </option>
          ))}
        </select>
      </SelectAsText>
    </Outer>
  );
}
