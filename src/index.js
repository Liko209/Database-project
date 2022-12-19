import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MenuList from "./routes/MenuList";
import MenuDetail from "./routes/MenuDetail";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<React.StrictMode>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="menu_list" element={<MenuList />} />
					<Route path="dish_list" element={<MenuList />} />
				</Route>
				<Route path="/menu_list/:menuId" element={<MenuDetail />} />
				<Route path="/*" element={<p>[404] - Page Not Found</p>} />
			</Routes>
		</React.StrictMode>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
