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
`;
