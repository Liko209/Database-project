import { Link, Outlet } from "react-router-dom";
import { Tabs } from "antd";

export default function App() {
	return (
		<>
			<h1> Database </h1>
			<Tabs
				defaultActiveKey="1"
				items={[
					{
						label: <Link to="/menu_list">Menu</Link>,
						key: "1",
					},
					{
						label: <Link to="/dish_list">Dish</Link>,
						key: "2",
					},
				]}
			/>
			<Outlet />
		</>
	);
}
