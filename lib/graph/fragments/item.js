const componentContents = require('./component-contents');

module.exports = `
fragment item on Item {
  id
  name
  type
  path
  topics {
    name
    children {
      name
    }
    parent {
      name
    }
  }
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
      ...paragraphCollection
    }
  }
}

${componentContents}
`;
