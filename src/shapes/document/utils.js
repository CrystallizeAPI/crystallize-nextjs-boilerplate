export function getArticlesWithoutRepeatedElements(articles) {
  if (!articles || articles.length === 0) {
    return null;
  }

  // We store into an array all the ids of the article items
  const articlesIds = articles.map((a) => a.node.id) || [];

  // Then, we create an array taking away the repeated ids.
  const articleIdsWithoutRepeatedElements = createArrayWithoutRepeatedElements(
    articlesIds
  );

  // For each unique id of a related content, to get the full item.
  const uniqueRelatedArticles = articleIdsWithoutRepeatedElements.map((id) =>
    articles.find((a) => a.node.id === id)
  );

  return uniqueRelatedArticles;
}

function createArrayWithoutRepeatedElements(array) {
  // We can filter the repeated elements from an array by executing
  // `Array.from(new Set(yourArray))` or `[...new Set(yourArray)]`
  //
  // Set objects have unique values. By Creating a set object and generating an array
  // from that Set object created, we assure that there are no repeated elements.
  // FYI: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  return Array.from(new Set(array));
}

export function getDocumentTitle(doc) {
  const titleComponent = doc?.components?.find((c) => c.name === 'Title');
  const title = titleComponent?.content?.text;

  return title || doc.name;
}

export function getHumanReadableDate(date) {
  return date.toDateString();
}

export function findAllDocumentTopics() {}
