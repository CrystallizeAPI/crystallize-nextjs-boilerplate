export default `
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

  fragment video on Video {
    title
    playlists
    thumbnails {
      key
      url
      variants {
        url
        width
      }
    }
  }

  fragment imageContent on ImageContent {
    images {
      ...image
    }
  }

  fragment videoContent on VideoContent {
    videos {
      ...video
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
      ...on Product {
        variants {
          price
          isDefault
          name
          image {
            ...image
          }
        }
      }
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
