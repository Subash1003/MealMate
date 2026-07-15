import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import {store} from "./redux/Store"

const root=ReactDom.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
        <App/>  
    </Provider>
);

