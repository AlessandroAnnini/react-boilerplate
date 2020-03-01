import React from 'react';
import { Auth, Hub } from 'aws-amplify';
import Amplify, { Hub } from '@aws-amplify/core';
import API, { graphqlOperation } from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import PubSub from '@aws-amplify/pubsub';
import Storage from '@aws-amplify/storage';

import User from 'Containers/User';

import awsconfig from 'aws-exports';

Amplify.configure(awsconfig);
API.configure(awsconfig);
PubSub.configure(awsconfig);
Storage.configure(awsconfig);

const CheckUser = () => {
  Auth.currentAuthenticatedUser()
    .then(user => console.log({ user }))
    .catch(err => console.log(err));
};

const getUserData = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const isFederated = !user.signInUserSession;
    const id = isFederated
      ? user.id
      : user.signInUserSession.idToken.payload.sub;
    const { data } = await API.graphql(graphqlOperation(getUser, { id }));
    return data.getUser;
  } catch (error) {
    return null;
    // console.log('error getUserData', error);
  }
};

const SignOut = () => {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};

const registerNewUser = async signInData => {
  const isFederated = !signInData.signInUserSession;
  const id = isFederated
    ? signInData.id
    : signInData.signInUserSession.idToken.payload.sub;

  const getUserInput = { id };
  const { data } = await API.graphql(graphqlOperation(getUser, getUserInput));
  // if we can't get a user (meaning the user hasn't been registered before), then we execute registerUser
  if (!data.getUser) {
    try {
      const input = {
        id,
        name: isFederated ? signInData.name : signInData.attributes.name,
        email: isFederated ? signInData.email : signInData.attributes.email
      };
      const { data } = await API.graphql(
        graphqlOperation(createUser, { input })
      );
      return data.createUser;
      // history.push(`/${data.createUser.type}/profile/edit`);
    } catch (err) {
      console.error('Error registering new user', err);
    }
  } else {
    return data.getUser;
    // history.push(`/${data.getUser.type}/dashboard`);
  }
};

export default () => {
  useEffect(() => {
    Hub.listen('auth', data => {
      const { payload } = data;
      console.log('A new auth event has happened: ', data);
      if (payload.event === 'signIn') {
        console.log('a user has signed in!');
        const user = await registerNewUser(data);
        // set user
      }
      if (payload.event === 'signOut') {
        console.log('a user has signed out!');
        // empty user
      }
    });
  }, []);

  const user = await getUserData();

  return (
    <User.Provider>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
        <button onClick={CheckUser}>Check User</button>
        <button onClick={SignOut}>Sign Out</button>
        <button onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
          Sign In with Facebook
        </button>
        <button onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
          Sign In with Google
        </button>
      </header>
    </div>
    </User.Provider>
  );
};
