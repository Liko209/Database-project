import React, { useEffect, useState } from "react";
import { Input, Button, Table, Space } from "antd";
import axios from "axios";

function ViewTodoList(props) {
  let { dishList } = props;
  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Dish Count", dataIndex: "dish_count", key: "dish_count" },
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
      <Table columns={columns} dataSource={dishList} />
    </div>
  );
}

export function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [dishList, setDishList] = useState([]);

  useEffect(() => {
    axiosGET();
  });
  const axiosGET = (
    searchKey = "",
    orderBy = "location",
    startPos = 0,
    pageSize = 100
  ) => {
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
    // const newItem = {
    // 	name: inputValue,
    // };
    axiosGET(inputValue);
    // inputValue && setDishList([...dishList, newItem]);
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
      <ViewTodoList dishList={dishList} />
    </div>
  );
}
