import React from "react";
import { Provider } from "react-redux";

import createStore from "Store";
import From from "Containers/Form";

import "./App.css";

const store = createStore({});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <From />
      </div>
    </Provider>
  );
}

export default App;
