import React, { useState } from "react";
import { Input, Button } from "antd";
import axios from "axios";

function ViewTodoList(props) {
	let { todoList, DelTask } = props;
	return (
		<div>
			<ul>
				{todoList.map((item, index) => {
					return (
						<div key={item + index}>
							<li title={index}>{item}</li>
							<button onClick={DelTask}>x</button>
						</div>
					);
				})}
			</ul>
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
				setPostList(res.data);
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
		inputValue && setTodoList([...todoList, inputValue]);
		setInputValue("");
	};

	let DelTask = (e) => {
		console.log(e);
		let target = parseInt(e.target.previousSibling.title);
		todoList.splice(target, 1);
		setTodoList([...todoList]);
		// setTodoList([...todoList.filter((item,index) => index !== target)])
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
				<Button type="primary">Submit</Button>
			</Input.Group>
			<ViewTodoList todoList={todoList} DelTask={DelTask} />
		</div>
	);
}
