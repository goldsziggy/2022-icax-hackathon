import { createContext } from 'react';

const defaultState = {
  example: {},
  setExample: () => {},
};

export default createContext(defaultState);
