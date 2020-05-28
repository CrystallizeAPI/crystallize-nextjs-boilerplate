import orderMutation from './graph/mutations/create-order';
import orderQuery from './graph/queries/order-by-id';

import { callOrdersApi } from './index';

export const createCrystallizeOrder = (variables) =>
  callOrdersApi({
    query: orderMutation,
    variables,
    operationName: 'createOrder',
  });

export const fetchCrystallizeOrder = (orderId) =>
  callOrdersApi({
    query: orderQuery,
    variables: { id: orderId },
    operationName: 'getOrder',
  });
