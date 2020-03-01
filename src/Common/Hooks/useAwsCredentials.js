import { useState, useEffect } from 'react';
import Auth from '@aws-amplify/auth';

export default () => {
  const [data, setData] = useState();

  const fetchData = () => {
    Auth.currentUserCredentials()
      .then(setData)
      .catch(console.log);
  };

  useEffect(fetchData, []);

  // return [data, fetchData];
  return data;
};
