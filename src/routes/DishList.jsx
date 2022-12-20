import { useEffect, useState } from "react";
import { Input, Button, Table, Tabs } from "antd";
import axios from "axios";

function ViewDishList(props) {
	let { dishList, numOfDishItem, current, handleChange } = props;
	const paginationProps = {
		current: current,
		defaultCurrent: 1,
		total: numOfDishItem,
		onChange: handleChange,
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
	const [sortBy, setSortBy] = useState("1");
	const [numOfDishItem, setNumOfDishItem] = useState(0);
	const [current, setCurrent] = useState(1);
	const [firstRender, setFirstRender] = useState(true);
	useEffect(() => {
		firstRender && axiosGET();
	});
	const axiosGET = (searchKey = "", orderBy = "name", startPos = 0, pageSize = 100) => {
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
				const dishItem = res.data[1][0].numResult;
				console.log("dishItem", dishItem);
				setNumOfDishItem(dishItem);
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
	};

	let handleSordBy = (index) => {
		switch (index) {
			case "1":
				setSortBy("1");
				axiosGET(inputValue, "location");
				break;
			case "2":
				setSortBy("2");
				axiosGET(inputValue, "year");
				break;
			case "3":
				setSortBy("3");
				axiosGET(inputValue, "dish_count");
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
						label: `Name`,
						key: "1",
					},
					{
						label: `Menus Appeared`,
						key: "2",
					},
				]}
			/>
			<ViewDishList
				dishList={dishList}
				numOfMenuItem={numOfDishItem}
				current={current}
				handleChange={handleChange}
			/>
		</div>
	);
}
