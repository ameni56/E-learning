import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import {configureStore} from "@reduxjs/toolkit"
import globalReducer from "./state/index"
import {Provider} from "react-redux"
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";
const store=configureStore({
reducer:{
	global:globalReducer,
	[api.reducerPath]: api.reducer,
},
middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
		{/*  */}
		<Provider store={store}>
			<App />
			</Provider>
			{/*  */}
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
