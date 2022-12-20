import { useEffect, useState } from "react";
import { Input, Button, Table, Tabs } from "antd";
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
				axiosGET("", "name");
				break;
			case "2":
				axiosGET("", "menus_appeared");
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
						label: `Name`,
						key: "1",
					},
					{
						label: `Menus Appeared`,
						key: "2",
					},
				]}
			/>
			<ViewDishList dishList={dishList} />
		</div>
	);
}
