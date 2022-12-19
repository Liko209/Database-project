import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MenuList from "./routes/MenuList";
import MenuDetail from "./routes/MenuDetail";
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
