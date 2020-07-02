import { useRouter } from 'next/router';
import styled from 'styled-components';

import { getLanguages, isMultilingual } from 'lib/language';

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

export default function LanguageSwitcher() {
  const router = useRouter();
  const languages = getLanguages();
  const {
    query: { language: currentLanguage }
  } = router;

  function onChange(e) {
    router.push(`/${e.target.value}`);
  }

  if (!isMultilingual) {
    return null;
  }

  return (
    <Outer>
      <SelectAsText>
        <span>Lang: {currentLanguage}</span>
        <select onChange={onChange} defaultValue={currentLanguage}>
          {languages.map((l) => (
            <option value={l} key={l}>
              {l}
            </option>
          ))}
        </select>
      </SelectAsText>
    </Outer>
  );
}
