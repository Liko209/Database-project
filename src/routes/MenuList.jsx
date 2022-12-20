import { useEffect, useState } from "react";
import { Input, Button, Table, Space, Tabs } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewMenuList(props) {
	let { menuList, numOfMenuItem, current, handleChange } = props;
	const paginationProps = {
		current: current,
		defaultCurrent: 1,
		total: numOfMenuItem,
		onChange: handleChange,
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
	const [sortBy, setSortBy] = useState("1");
	const [numOfMenuItem, setNumOfMenuItem] = useState(0);
	const [current, setCurrent] = useState(1);
	const [firstRender, setFirstRender] = useState(true);
	useEffect(() => {
		firstRender && axiosGET();
	});
	const axiosGET = (searchKey = "", orderBy = "location", startPos = 0, pageSize = 10000) => {
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
				const menuItem = res.data[1][0].numResult;
				console.log("menuItem", menuItem);
				setMenuList(newList);
				setNumOfMenuItem(menuItem);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let inputValueChange = (e) => {
		setInputValue(e.target.value);
	};

	let handleSearch = () => {
		switch (sortBy) {
			case "1":
				axiosGET(inputValue, "location");
				break;
			case "2":
				axiosGET(inputValue, "year");
				break;
			case "3":
				axiosGET(inputValue, "dish_count");
				break;
			default:
		}
		setCurrent(1);
		setInputValue("");
	};

	let handleSordBy = (index) => {
		switch (index) {
			case "1":
				setSortBy("1");
				axiosGET("", "location");
				break;
			case "2":
				setSortBy("2");
				axiosGET("", "year");
				break;
			case "3":
				setSortBy("3");
				axiosGET("", "dish_count");
				break;
			default:
		}
	};

	let handleChange = (page) => {
		setCurrent(page);
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
					onPressEnter={handleSearch}
					onChange={inputValueChange}
				/>
				<Button type="primary" onClick={handleSearch}>
					Search
				</Button>
			</Input.Group>
			<span>Sort By:</span>
			<Tabs
				style={{ display: "inline-block" }}
				defaultActiveKey="1"
				onChange={handleSordBy}
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
			<ViewMenuList
				menuList={menuList}
				numOfMenuItem={numOfMenuItem}
				current={current}
				handleChange={handleChange}
			/>
		</div>
	);
}
