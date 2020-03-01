import {
  stripeConnectExpressClientId,
  stripeConnectExpressRedirectUri
} from 'Config/keys';

const stripeUrlParameters = (url, user) => {
  const addressComponents = user.address
    ? JSON.parse(user.address.addressComponents)
    : { country: 'Italy' };

  const params = {
    'stripe_user[first_name]': user.givenName || undefined,
    'stripe_user[last_name]': user.familyName || undefined,
    'stripe_user[email]': user.email || undefined,
    'stripe_user[country]': addressComponents.country === 'Italy' ? 'IT' : '',
    'stripe_user[phone_number]': user.phone || undefined,
    'stripe_user[gender]': user.sex === 'uomo' ? 'male' : 'female'
  };

  return Object.keys(params).reduce((res, k) => {
    res += params[k] ? `&${k}=${params[k]}` : '';
    return res;
  }, url);
};

export default user => {
  if (!user) return '';

  let stripeUrl = `https://connect.stripe.com/express/oauth/authorize`;
  stripeUrl += `?redirect_uri=${stripeConnectExpressRedirectUri}`;
  stripeUrl += `&client_id=${stripeConnectExpressClientId}`;
  stripeUrl = stripeUrlParameters(stripeUrl, user);

  return stripeUrl;
};
