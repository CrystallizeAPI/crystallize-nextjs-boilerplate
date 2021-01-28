import { Facet, FacetHeader, FacetTitle } from './styles';

export { FaceGroupAction } from './action';

export function FacetGroup({ title, action, children }) {
  return (
    <Facet>
      <FacetHeader>
        <FacetTitle>{title}</FacetTitle>
        {action}
      </FacetHeader>
      {children}
    </Facet>
  );
}
