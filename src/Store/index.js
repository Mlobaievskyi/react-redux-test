// @flow

import { createStore } from "redux";
import rootReducer from "Store/reducers";

const configureStore = (preloadedState: {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__?.() ?? ((fn) => fn)
  );

  return store;
};

export default configureStore;
