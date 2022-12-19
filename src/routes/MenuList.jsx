import { useEffect, useState } from "react";
import { Input, Button, Table, Space, Tabs } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

// const dataSource = [
// 	{ id: 31054, location: "Plaza Hotel", year: 1933, dish_count: 4053 },
// 	{ id: 34201, location: "Waldorf Astoria", year: 1914, dish_count: 21312 },
// ];

function ViewMenuList(props) {
	let { menuList } = props;
	const paginationProps = {
		total: menuList.length,
	};
	const columns = [
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
		},
		{
			title: "Year",
			dataIndex: "year",
			key: "year",
		},
		{
			title: "Dish Count",
			dataIndex: "dish_count",
			key: "dish_count",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/menu_list/${record.id}`} key={record.id}>
						Detail
					</Link>
				</Space>
			),
		},
	];
	return (
		<div>
			<Table columns={columns} dataSource={menuList} pagination={paginationProps} />
		</div>
	);
}

export default function MenuList() {
	const [inputValue, setInputValue] = useState("");
	const [menuList, setMenuList] = useState([]);
	const [firstRender, setFirstRender] = useState(true);
	useEffect(() => {
		firstRender && axiosGET();
	});
	const axiosGET = (searchKey = "", orderBy = "location", startPos = 0, pageSize = 100) => {
		firstRender && setFirstRender(false);
		axios
			.get("http://localhost:3306/showMenuInfo", {
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
				setMenuList(newList);
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

	let sordBy = (index) => {
		console.log(index);
		switch (index) {
			case "1":
				axiosGET("", "location");
				break;
			case "2":
				axiosGET("", "year");
				break;
			case "3":
				axiosGET("", "dish_count");
				break;
			default:
		}
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
			<span>Sort By:</span>
			<Tabs
				style={{ display: "inline-block" }}
				defaultActiveKey="1"
				onChange={sordBy}
				items={[
					{
						label: `Location`,
						key: "1",
					},
					{
						label: `Year`,
						key: "2",
					},
					{
						label: `Dish Count`,
						key: "3",
					},
				]}
			/>
			<ViewMenuList menuList={menuList} />
		</div>
	);
}
