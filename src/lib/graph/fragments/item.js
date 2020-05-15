import componentContents from './component-contents';

export default `
  fragment item on Item {
    id
    name
    type
    path
    
    components {
      name
      type
      meta {
        key
        value
      }
      content {
        ...singleLine
        ...richText
        ...imageContent
        ...videoContent
        ...paragraphCollection
        ...itemRelation
        ...propertiesTableContent
      }
    }
  }

  ${componentContents}
`;
