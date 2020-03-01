import API from '@aws-amplify/api';

const apiCall = async (apiName, path, body) => {
  const response = await API.post(apiName, `/stripe${path}`, {
    body
  }).catch(err => {
    let error;
    if (err.response.data.raw) {
      const { statusCode, message, requestId, type } = err.response.data.raw;
      error = {
        statusCode,
        message,
        requestId,
        type
      };
    } else {
      error = {
        statusCode: err.response.status,
        message: 'Unexpected error'
      };
    }

    console.error('Error StripeApi', error);
  });

  return response;
};

export const testCall = async dataString =>
  await apiCall('dialogostripeapi', '/feePercent', { dataString });

export const createCustomer = async (email, name, metadata) =>
  await apiCall('dialogostripeapi', '/customer/create', {
    email,
    name,
    metadata
  });

export const getCustomer = async customerId =>
  await apiCall('dialogostripeapi', '/customer/get', { customerId });

export const addCardToCustomer = async (customerId, source) =>
  await apiCall('dialogostripeapi', '/card/create', { customerId, source });

export const removeCustomerCard = async (customerId, cardId) =>
  await apiCall('dialogostripeapi', '/card/delete', { customerId, cardId });

export const createAccount = async code =>
  await apiCall('dialogostripeapi', '/express-account/create', { code });

export const loginAccount = async stripeId =>
  await apiCall('dialogostripeapi', '/express-account/loginLink', { stripeId });

export const deleteAccount = async stripeId =>
  await apiCall('dialogostripeapi', '/express-account/delete', { stripeId });

export const getAccount = async stripeId =>
  await apiCall('dialogostripeapi', '/express-account/get', { stripeId });

export const createPayment = async (
  amount,
  cardId,
  customerId,
  customerEmail,
  connectedAccountId,
  metadata
) =>
  await apiCall('dialogostripeapi', '/payment-intent/create', {
    amount,
    cardId,
    customerId,
    customerEmail,
    connectedAccountId,
    metadata
  });

export const authorizePayment = async (
  amount,
  cardId,
  customerId,
  customerEmail,
  connectedAccountId,
  metadata
) =>
  await apiCall('dialogostripeapi', '/payment-intent/authorize', {
    amount,
    cardId,
    customerId,
    customerEmail,
    connectedAccountId,
    metadata
  });

export const capturePayment = async paymentIntentId =>
  await apiCall('dialogostripeapi', '/payment-intent/capture', {
    paymentIntentId
  });

export const cancelPayment = async paymentIntentId =>
  await apiCall('dialogostripeapi', '/payment-intent/cancel', {
    paymentIntentId
  });

export const getPaymentIntent = async paymentIntentId =>
  await apiCall('dialogostripeapi', '/payment-intent/get', {
    paymentIntentId
  });
