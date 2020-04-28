const componentContents = require('./component-contents');

module.exports = `
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
