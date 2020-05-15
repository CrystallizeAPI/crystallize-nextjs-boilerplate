import styled from 'styled-components';

import { colors } from 'ui';

export const CardElementWrapper = styled.div`
  border-bottom: 1px solid ${colors.frost};
  padding: 0.3rem 0;
  margin-bottom: 1rem;
  transition: border 0.2s ease-in-out;
`;

export const ErrorMessage = styled.p`
  font-size: 16px;
  color: ${colors.error};
  margin-top: 1rem;
`;
