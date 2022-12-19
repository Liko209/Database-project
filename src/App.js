import React, { useState } from "react";
import { Input, Button, Table, Space } from "antd";
import axios from "axios";

function ViewTodoList(props) {
	let { todoList } = props;
	const columns = [
		{ title: "Name", dataIndex: "name", key: "name" },
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					{/* <a>Invite {record.name}</a> */}
					<Button>View In Map</Button>
				</Space>
			),
		},
	];
	return (
		<div>
			<Table columns={columns} dataSource={todoList} />
		</div>
	);
}

export function TodoList() {
	const [inputValue, setInputValue] = useState("");
	const [todoList, setTodoList] = useState([]);

	const axiosGET = () => {
		axios
			.get("http://localhost:3000/posts")
			.then((res) => {
				console.log("success GET!");
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let inputValueChange = (e) => {
		setInputValue(e.target.value);
	};

	let AddTask = () => {
		const newItem = {
			name: inputValue,
		};
		inputValue && setTodoList([...todoList, newItem]);
		setInputValue("");
	};

	// let DelTask = (e) => {
	// 	console.log(e);
	// 	let target = parseInt(e.target.previousSibling.title);
	// 	todoList.splice(target, 1);
	// 	setTodoList([...todoList]);
	// 	// setTodoList([...todoList.filter((item,index) => index !== target)])
	// };

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
					Submit
				</Button>
			</Input.Group>
			<ViewTodoList todoList={todoList} />
		</div>
	);
}
