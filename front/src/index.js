import React from "react";
import ReactDOM from "react-dom";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ReduxToastr from "react-redux-toastr";
import "semantic-ui-css/semantic.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "./store/configureStore";
import reportWebVitals from "./reportWebVitals";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr
      position="bottom-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
    />
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
