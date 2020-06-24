import { createStore, compose } from "redux";
import rootReducer from "Store/reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const configureStore = (preloadedState: {}) => {
  const store = createStore(rootReducer, preloadedState, composeEnhancers());

  return store;
};

export default configureStore;
