import updateProductMutation from './graph/mutations/update-product';
import publishProductMutation from './graph/mutations/publish-product';
import fetchProductQuery from './graph/queries/product-by-id';

import { callPimApi } from './index';

export const updateProductStock = (variables) =>
  callPimApi({
    query: updateProductMutation,
    variables,
    operationName: 'updateProductStock'
  });

export const fetchProduct = (variables) => {
  callPimApi({
    query: fetchProductQuery,
    variables,
    operationName: 'fetchProduct'
  });
};
export const publishProduct = (variables) =>
  callPimApi({
    query: publishProductMutation,
    variables,
    operationName: 'publishProduct'
  });
