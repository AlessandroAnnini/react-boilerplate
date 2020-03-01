import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useUser = (initialState = null) => {
  const [user, setUser] = useState(initialState);
  return { user, setUser };
};

export default createContainer(useUser);
