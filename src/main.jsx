import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-input-2/lib/bootstrap.css";
import RouterPage from "./routes/Router.jsx";
import { Provider } from "react-redux";
import store from "./store/Store.jsx"; // Assuming you've created your Redux store

const elementId = "root";

ReactDOM.createRoot(document.getElementById(elementId)).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterPage />
    </Provider>
  // </React.StrictMode>
);
