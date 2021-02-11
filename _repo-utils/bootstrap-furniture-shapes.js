/**
 * When run, this file will inject shapes to your tenant that is required for the
 * frntr boilerplate to look properly
 */

//Your tenant id (not identifier). See the tenant tab https://pim.crystallize.com/settings/tenants
const TENANT_ID = '';

// Add your tokens https://pim.crystallize.com/settings/access-tokens
const ACCESS_TOKEN_ID = '';
const ACCESS_TOKEN_SECRET = '';

const coreUrl = 'https://pim.crystallize.com/graphql';
const fetch = require('node-fetch');

const {
  buildCreateShapeMutation,
  shapeTypes,
  componentTypes
} = require('@crystallize/import-utilities');

const Product = {
  tenantId: TENANT_ID,
  name: 'Product',
  identifier: 'frntr-product',
  type: shapeTypes.product,
  components: [
    {
      id: 'summary',
      name: 'Summary',
      type: componentTypes.richText
    },
    {
      id: 'Specs',
      name: 'Specs',
      type: componentTypes.propertiesTable
    },
    {
      id: 'description',
      name: 'Description',
      type: componentTypes.paragraphCollection
    },
    {
      id: 'related-products',
      name: 'Related products',
      type: componentTypes.itemRelations
    }
  ]
};

const Folder = {
  tenantId: TENANT_ID,
  name: 'Folder',
  identifier: 'frntr-folder',
  type: shapeTypes.folder,
  components: [
    {
      id: 'title',
      name: 'Title',
      type: componentTypes.singleLine
    },
    {
      id: 'brief',
      name: 'Brief',
      type: componentTypes.richText
    },
    {
      id: 'body',
      name: 'Body',
      type: componentTypes.paragraphCollection
    },
    {
      id: 'stackable-content',
      name: 'Stackable content',
      type: componentTypes.itemRelations
    }
  ]
};

const Article = {
  tenantId: TENANT_ID,
  name: 'Article',
  identifier: 'frntr-article',
  type: shapeTypes.document,
  components: [
    {
      id: 'title',
      name: 'Title',
      type: componentTypes.singleLine
    },
    {
      id: 'image',
      name: 'Image',
      type: componentTypes.images
    },
    {
      id: 'intro',
      name: 'Intro',
      type: componentTypes.richText
    },
    {
      id: 'body',
      name: 'Body',
      type: componentTypes.paragraphCollection
    },
    {
      id: 'video',
      name: 'Video',
      type: componentTypes.videos
    },
    {
      id: 'featured',
      name: 'Featured',
      type: componentTypes.itemRelations
    }
  ]
};

const Banner = {
  tenantId: TENANT_ID,
  name: 'Banner',
  identifier: 'frntr-banner',
  type: shapeTypes.document,
  components: [
    {
      id: 'title',
      name: 'Title',
      type: componentTypes.singleLine
    },
    {
      id: 'description',
      name: 'Description',
      type: componentTypes.richText
    },
    {
      id: 'link',
      name: 'Link',
      type: componentTypes.singleLine
    },
    {
      id: 'link-text',
      name: 'Link text',
      type: componentTypes.singleLine
    },
    {
      id: 'image',
      name: 'Image',
      type: componentTypes.images
    },
    {
      id: 'add-text-as-overlay',
      name: 'Add text as overlay',
      type: componentTypes.boolean
    }
  ]
};

const Collection = {
  tenantId: TENANT_ID,
  name: 'Collection',
  identifier: 'frntr-collection',
  type: shapeTypes.document,
  components: [
    {
      id: 'title',
      name: 'Title',
      type: componentTypes.singleLine
    },
    {
      id: 'description',
      name: 'Description',
      type: componentTypes.richText
    },
    {
      id: 'content',
      name: 'Content',
      type: componentTypes.componentChoice,
      config: {
        componentChoice: {
          choices: [
            {
              id: 'items',
              name: 'Items',
              type: componentTypes.itemRelations
            },
            {
              id: 'grid',
              name: 'Grid',
              type: componentTypes.gridRelations
            }
          ]
        }
      }
    }
  ]
};

const shapesToInject = [Banner, Article, Folder, Product, Collection];
(async function injectFurnitureShapes() {
  if (!TENANT_ID) {
    console.log('\x1b[31m', `Missing tenant id`);
    return;
  }
  if (!ACCESS_TOKEN_ID || !ACCESS_TOKEN_SECRET) {
    console.log('\x1b[31m', `Missing token`);
    return;
  }
  let fails = 0;
  for (let i = 0; i < shapesToInject.length; i++) {
    const mutation = buildCreateShapeMutation(shapesToInject[i]);
    const response = await simplyFetchFromGraph({ query: mutation });
    const { errors } = response;
    if (errors) {
      console.log('\x1b[31m', `${shapesToInject[i].name} failed,`);

      for (let i = 0; i < errors.length; i++) {
        console.log('\x1b[37m', `-${errors[i].message}`);
        fails++;
      }
    } else {
      console.log(
        '\x1b[32m',
        `${shapesToInject[i].name} successfully imported`
      );
    }
  }
  console.log(
    fails > 0 ? '\x1b[31m' : '\x1b[32m',
    `Import completed with ${fails} errors`
  );
})();

async function simplyFetchFromGraph({ uri = coreUrl, query, variables }) {
  const body = JSON.stringify({ query, variables });
  const response = await fetch(uri, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'x-crystallize-access-token-id': ACCESS_TOKEN_ID,
      'x-crystallize-access-token-secret': ACCESS_TOKEN_SECRET
    },
    body
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}
