import { Link, Outlet } from "react-router-dom";

export default function App() {
	return (
		<>
			<h1> Database </h1>
			<nav>
				<Link to="/menu_list">Menu</Link>
				<Link to="/dish_list">Dish</Link>
			</nav>
			<Outlet />
		</>
	);
}
