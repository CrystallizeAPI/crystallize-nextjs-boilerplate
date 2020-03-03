module.exports = `
  fragment singleLine on SingleLineContent {
    text
  }

  fragment richText on RichTextContent {
    json
  }

  fragment image on Image {
    url
    altText
    variants {
      url
      width
    }
  }

  fragment imageContent on ImageContent {
    images {
      ...image
    }
  }

  fragment paragraphCollection on ParagraphCollectionContent {
    paragraphs {
      title {
        ...singleLine
      }
      body {
        ...richText
      }
      images {
        ...image
      }
    }
  }

  fragment itemRelation on ItemRelationsContent {
    items {
      id
      name
      path
    }
  }

  fragment propertiesTableContent on PropertiesTableContent {
    sections {
      title
      properties {
        key
        value
      }
    }
  }
`;
