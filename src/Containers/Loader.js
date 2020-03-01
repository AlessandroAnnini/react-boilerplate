import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useLoader = (initialState = false) => {
  const [loader, setLoader] = useState(initialState);
  return { loader, setLoader };
};

export default createContainer(useLoader);
