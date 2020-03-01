import { useState, useEffect } from 'react';
import { getCustomer, getPaymentIntent } from 'Utils/StripeApi';

export const useStripeCustomer = (customerId, lastUpdate) => {
  const [stripeCustomer, setStripeCustomer] = useState();

  useEffect(() => {
    if (customerId) {
      const makeRequest = async () => {
        const response = await getCustomer(customerId);

        if (response) setStripeCustomer(response.customer);
      };

      makeRequest();
    }
  }, [customerId, lastUpdate]);

  return stripeCustomer;
};

export const useStripePaymentIntent = paymentIntentId => {
  const [stripePaymentIntent, setStripePaymentIntent] = useState();

  useEffect(() => {
    if (paymentIntentId) {
      const makeRequest = async () => {
        const response = await getPaymentIntent(paymentIntentId).catch(err =>
          console.log('error getting payment intent', err)
        );

        if (response) setStripePaymentIntent(response.paymentIntent);
      };

      makeRequest();
    }
  }, [paymentIntentId]);

  return stripePaymentIntent;
};
