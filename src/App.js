import { Link, Outlet } from "react-router-dom";
import { Space } from "antd";

export default function App() {
	return (
		<Space direction="vertical" size={"large"}>
			<h1> Database </h1>
			<nav>
				<Link to="/menu_list">Menu</Link>
				<Link to="/dish_list">Dish</Link>
			</nav>
			<Outlet />
		</Space>
	);
}
