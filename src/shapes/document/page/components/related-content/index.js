import { Outer, Title, Content } from './styles';

export function DocumentRelatedContentSection({ title, children }) {
  return (
    <Outer>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Outer>
  );
}
