import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Descriptions, Table } from "antd";
import styled from "styled-components";
import axios from "axios";

const container = styled("div")``;

const columns = [
	{
		title: "Dish",
		dataIndex: "name",
		key: "dish",
	},
	{
		title: "Page",
		dataIndex: "page_number",
		key: "page",
	},
	{
		title: "Price",
		dataIndex: "price",
		key: "price",
	},
];
export default function MenuDetail() {
	const params = useParams();
	const [resInfo, setResInfo] = useState({});
	const [dishInfo, setDishInfo] = useState([]);
	const [firstRender, setFirstRender] = useState(true);
	useEffect(() => {
		firstRender && axiosGET(params.menuId);
	});
	const axiosGET = (menuID = "") => {
		firstRender && setFirstRender(false);
		axios
			.get("http://localhost:3306/showDishOfMenu", {
				params: {
					menuID: menuID,
				},
			})
			.then((res) => {
				console.log("success GET!");
				console.log("res.data", res.data);
				const newResInfo = res.data[0][0];
				const newDishInfo = res.data[1];
				console.log("newResInfo", newResInfo);
				console.log("newDishInfo", newDishInfo);
				setResInfo(newResInfo);
				setDishInfo(newDishInfo);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<h1>{resInfo.location}</h1>
			<container>
				<div className="left">
					<Descriptions title="Restaurant Info" bordered layout="vertical">
						<Descriptions.Item label="Location">{resInfo.location || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Dish">{resInfo.dish_count || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Date">{resInfo.date || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Sponsor" span={2}>
							{resInfo.sponsor || "N/A"}
						</Descriptions.Item>
						<Descriptions.Item label="Place">{resInfo.place || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Physical description">
							{resInfo.descriptions || "N/A"}
						</Descriptions.Item>
						<Descriptions.Item label="Call number">{resInfo.call_number || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Notes">{resInfo.notes || "N/A"}</Descriptions.Item>
					</Descriptions>
				</div>
				<div className="right">
					<Table columns={columns} dataSource={dishInfo} />
				</div>
			</container>
		</>
	);
}
