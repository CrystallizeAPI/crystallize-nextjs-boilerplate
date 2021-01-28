import { FacetAction } from './styles';

export function FaceGroupAction({ onClick, children }) {
  return <FacetAction onClick={onClick}>{children}</FacetAction>;
}
