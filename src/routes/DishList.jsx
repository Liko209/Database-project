import { useEffect, useState } from "react";
import { Input, Button, Table, Space } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewDishList(props) {
	let { dishList } = props;
	const paginationProps = {
		total: dishList.length,
	};
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Menus Appeared",
			dataIndex: "menus_appeared",
			key: "menus_appeared",
		},
		// {
		// 	title: "Action",
		// 	key: "action",
		// 	render: (_, record) => (
		// 		<Space size="middle">
		// 			<Link to={`/dish_list/${record.id}`} key={record.id}>
		// 				Detail
		// 			</Link>
		// 		</Space>
		// 	),
		// },
	];
	return (
		<div>
			<Table columns={columns} dataSource={dishList} pagination={paginationProps} />
		</div>
	);
}

export default function DishList() {
	const [inputValue, setInputValue] = useState("");
	const [dishList, setDishList] = useState([]);
	const [firstRender, setFirstRender] = useState(true);
	useEffect(() => {
		firstRender && axiosGET();
	});
	const axiosGET = (searchKey = "", orderBy = "location", startPos = 0, pageSize = 100) => {
		firstRender && setFirstRender(false);
		axios
			.get("http://localhost:3306/showDishInfo", {
				params: {
					searchKey: searchKey,
					orderBy: orderBy,
					startPos: startPos,
					pageSize: pageSize,
				},
			})
			.then((res) => {
				console.log("success GET!");
				console.log("res.data", res.data);
				const newList = res.data[0];
				console.log("newList", newList);
				setDishList(newList);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let inputValueChange = (e) => {
		setInputValue(e.target.value);
	};

	let AddTask = () => {
		axiosGET(inputValue);
		setInputValue("");
	};

	return (
		<div>
			<Input.Group compact>
				<Input
					style={{
						width: "calc(100% - 200px)",
					}}
					defaultValue="https://ant.design"
					value={inputValue}
					onPressEnter={AddTask}
					onChange={inputValueChange}
				/>
				<Button type="primary" onClick={AddTask}>
					Search
				</Button>
			</Input.Group>
			<ViewDishList dishList={dishList} />
		</div>
	);
}
