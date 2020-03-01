import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useSnackbar = (initialState = null) => {
  const [snackbar, setSnackbar] = useState(initialState);
  return { snackbar, setSnackbar };
};

export default createContainer(useSnackbar);
