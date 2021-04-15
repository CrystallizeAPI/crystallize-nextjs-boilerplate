import React from 'react';
import styled from 'styled-components';

import { useTranslation } from 'next-i18next';

export const TotalResults = styled.span`
  color: #000;
  font-weight: 600;
  display: block;
  margin-bottom: 10px;
  font-size: 1rem;
`;

export default function SearchCount({ count }) {
  const { t } = useTranslation('common');

  return <TotalResults>{t('search.foundResults', { count })}</TotalResults>;
}
