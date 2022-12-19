import { useParams } from "react-router-dom";
import { useState } from "react";
import { Descriptions, Table } from "antd";
import styled from "styled-components";
import axios from "axios";

const container = styled("div")``;
const dataSource = [
	[
		{
			id: 31054,
			name: null,
			sponsor: "Plaza Hotel",
			event: null,
			place: null,
			notes: "62 menus bound into 1 volume",
			call_number: "1933-0128_wotm",
			language: null,
			date: "1933-05-01T04:00:00.000Z",
			location: "Plaza Hotel",
			currency: "Dollars",
			currency_symbol: "$",
			page_count: 62,
			dish_count: 4053,
		},
	],
	[
		{ name: "Anchovy Canape", page_number: 1, price: 0.6 },
		{ name: "Clam Juice Cocktail", page_number: 1, price: 0.35 },
		{ name: "Cocktail Sauce", page_number: 1, price: 0.1 },
		{ name: "Crab Flake Cocktail", page_number: 1, price: 0.75 },
		{ name: "Filet of Herring", page_number: 1, price: 0.5 },
		{ name: "Fresh Caviar", page_number: 1, price: 2.25 },
		{ name: "Fruit Supreme", page_number: 1, price: 0.65 },
		{ name: "Grapefruit", page_number: 1, price: 0.65 },
		{ name: "Hors d'Oeuvre Varies", page_number: 1, price: null },
		{ name: "Little Neck Clams", page_number: 1, price: 0.45 },
		{ name: "Maquereau au Vin blanc", page_number: 1, price: 0.5 },
		{ name: "Melon", page_number: 1, price: 0.65 },
		{ name: "Orange", page_number: 1, price: 0.65 },
		{ name: "Petit Artichoke Mariniere", page_number: 1, price: 0.5 },
		{ name: "Pineapple Paradise", page_number: 1, price: 0.75 },
		{ name: "Salami", page_number: 1, price: 0.5 },
		{ name: "Sea Food Cocktail Plaza", page_number: 1, price: 1 },
		{ name: "Shrimp Cocktail", page_number: 1, price: 0.75 },
		{ name: "Smoked Salmon", page_number: 1, price: 0.75 },
		{ name: "Stuffed Celery", page_number: 1, price: 0.5 },
		{ name: "Tomato Juice Cocktail", page_number: 1, price: 0.35 },
		{ name: "Tomato Monegasque", page_number: 1, price: 0.75 },
		{ name: "Alligator Pear Salad", page_number: 3, price: 0.7 },
		{ name: "anchovy canape", page_number: 3, price: 0.6 },
		{ name: "Apple Pie", page_number: 3, price: 0.35 },
		{ name: "Artichoke", page_number: 3, price: 0.6 },
		{
			name: "Baked Lobster Beaugency (1/2)",
			page_number: 3,
			price: 1.5,
		},
		{
			name: "Bavarian Cream, Marie-Louise",
			page_number: 3,
			price: 0.4,
		},
		{ name: "Beets in Butter", page_number: 3, price: 0.5 },
		{ name: "Bel Paese Cheese", page_number: 3, price: 0.45 },
		{ name: "Biron Potatoes", page_number: 3, price: 0.45 },
		{ name: "Boiled Bermuda Potatoes", page_number: 3, price: 0.3 },
		{ name: "bortsch a la russe", page_number: 3, price: 0.5 },
		{ name: "Braised Celery", page_number: 3, price: 0.6 },
		{ name: "Braised Lettuce", page_number: 3, price: 0.6 },
		{ name: "Brie cheese", page_number: 3, price: 0.45 },
		{ name: "Broiler", page_number: 3, price: 3 },
		{ name: "Broiler (1/2)", page_number: 3, price: 1.5 },
		{
			name: "Brook Trout au Bleu, Sauce Escoffier",
			page_number: 3,
			price: 1,
		},
		{ name: "Calf's head en tortue", page_number: 3, price: 1.1 },
		{ name: "CAMEMBERT CHEESE", page_number: 3, price: 0.45 },
		{ name: "Cantaloupe", page_number: 3, price: 0.6 },
		{ name: "Carrots vichy", page_number: 3, price: 0.5 },
		{ name: "Cauliflower", page_number: 3, price: 0.7 },
		{ name: "Chicken okra soup", page_number: 3, price: 0.5 },
		{
			name: "Chicken-Halibut au Beurre d'Anchois with Potatoes Allumette",
			page_number: 3,
			price: 1.1,
		},
		{ name: "Chicory Salad", page_number: 3, price: 0.45 },
		{ name: "Clam Juice Cocktail", page_number: 3, price: 0.35 },
		{ name: "Cocktail Sauce", page_number: 3, price: 0.1 },
		{ name: "Cold Apple Custard Pudding", page_number: 3, price: 0.35 },
		{ name: "Crab Flake Cocktail", page_number: 3, price: 0.75 },
		{ name: "Creamed Spinach", page_number: 3, price: 0.6 },
		{ name: "Delicious Apple", page_number: 3, price: 0.2 },
		{ name: "Dixie Potatoes", page_number: 3, price: 0.5 },
		{ name: "Endive Salad", page_number: 3, price: 0.45 },
		{ name: "English Cheddar Cheese", page_number: 3, price: 0.5 },
		{
			name: "Escalopines of Milk Veal au Vin Blanc with String Beans and Veloute Crecy",
			page_number: 3,
			price: 1.25,
		},
		{ name: "Escarole Salad", page_number: 3, price: 0.45 },
		{ name: "Filet of Herring", page_number: 3, price: 0.5 },
		{ name: "Filet of Sole Cafe de Paris", page_number: 3, price: 0.9 },
		{ name: "French Pastry (1)", page_number: 3, price: 0.25 },
		{ name: "Fresh Caramel Ice Cream", page_number: 3, price: 0.45 },
		{ name: "Fresh Caviar", page_number: 3, price: 2.25 },
		{ name: "fresh strawberry ice cream", page_number: 3, price: 0.45 },
		{ name: "Fried Egg Plant", page_number: 3, price: 0.5 },
		{ name: "Frogs' Legs a la Cavour", page_number: 3, price: 1.25 },
		{ name: "Fruit salad", page_number: 3, price: 0.6 },
		{ name: "Fruit Supreme", page_number: 3, price: 0.65 },
		{
			name: "Glazed Virginia Ham, Sauce Porto with Sweet Potatoes Dixie, Braised Celery",
			page_number: 3,
			price: 1.25,
		},
		{ name: "Gorgonzola Cheese", page_number: 3, price: 0.5 },
		{ name: "Grapefruit", page_number: 3, price: 0.4 },
		{ name: "Grapefruit Supreme", page_number: 3, price: 0.65 },
		{ name: "Grapes", page_number: 3, price: 0.5 },
		{ name: "Grilled Bluefish Baltimore", page_number: 3, price: 1.1 },
		{
			name: "Grilled Egg Plant and Tomato Baltimore",
			page_number: 3,
			price: 0.9,
		},
		{
			name: "Grilled Kernel of Sweatbread with Bacon and Heart of Artichoke Princesse",
			page_number: 3,
			price: 1.5,
		},
		{ name: "Home-Made Chicken Soup", page_number: 3, price: 0.5 },
		{ name: "Honeydew Melon", page_number: 3, price: 0.6 },
		{ name: "Hors d'oeuvre variés", page_number: 3, price: null },
		{ name: "Hot Albufera Pudding", page_number: 3, price: 0.35 },
		{
			name: "Hot-House Chicken l'Athuile (1/2)",
			page_number: 3,
			price: 1.75,
		},
		{ name: "Hubbard Squash", page_number: 3, price: 0.5 },
		{ name: "Imperial Squab Souvaroff", page_number: 3, price: 2 },
		{ name: "Jeannette salad", page_number: 3, price: 0.6 },
		{ name: "Jellied Beef Consomme, Cup", page_number: 3, price: 0.4 },
		{
			name: "Jellied Chicken Consomme, Cup",
			page_number: 3,
			price: 0.4,
		},
		{
			name: "Jellied Consomme, Madrilene, Cup",
			page_number: 3,
			price: 0.4,
		},
		{ name: "Jellied Gumbo Consomme, Cup", page_number: 3, price: 0.4 },
		{ name: "Jersey Asparagus", page_number: 3, price: 0.9 },
		{ name: "King Orange", page_number: 3, price: 0.2 },
		{ name: "Lettuce Salad", page_number: 3, price: 0.45 },
		{
			name: "Lettuce, Tomato and Asparagus Tips Salad",
			page_number: 3,
			price: 0.6,
		},
		{ name: "Liederkranz Cheese", page_number: 3, price: 0.45 },
		{ name: "Little Neck clams", page_number: 3, price: 0.45 },
		{ name: "Maquereau au vin blanc", page_number: 3, price: 0.5 },
		{ name: "Mashed yellow turnips", page_number: 3, price: 0.5 },
		{ name: "Melon Supreme", page_number: 3, price: 0.65 },
		{ name: "Mimosa salad", page_number: 3, price: 0.6 },
		{ name: "Mixed Green Salad", page_number: 3, price: 0.45 },
		{ name: "New Lima Beans", page_number: 3, price: 0.6 },
	],
];

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
	const [menuInfo, setMenuInfo] = useState([]);
	const axiosGET = (searchKey = "") => {
		axios
			.get("http://localhost:3306/showDishOfMenu", {
				params: {
					menuID: searchKey
				},
			})
			.then((res) => {
				console.log("success GET!");
				console.log("res.data", res.data);
				setMenuInfo(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// static
	// const RestaurantInfo = dataSource[0][0];
	// const data = dataSource[1];

	// database
	console.log(1111);
	console.log(menuInfo);
	axiosGET(params.menuId);
	console.log(22222);
	console.log(menuInfo);
	const RestaurantInfo = menuInfo[0][0];
	const data = menuInfo[1];
	return (
		<>
			<h1>{RestaurantInfo.location}</h1>
			<container>
				<div className="left">
					<Descriptions title="Restaurant Info" bordered layout="vertical">
						<Descriptions.Item label="Location">{RestaurantInfo.location || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Dish">{RestaurantInfo.dish_count || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Date">{RestaurantInfo.date || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Sponsor" span={2}>
							{RestaurantInfo.sponsor || "N/A"}
						</Descriptions.Item>
						<Descriptions.Item label="Place">{RestaurantInfo.place || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Physical description">
							{RestaurantInfo.descriptions || "N/A"}
						</Descriptions.Item>
						<Descriptions.Item label="Call number">{RestaurantInfo.call_number || "N/A"}</Descriptions.Item>
						<Descriptions.Item label="Notes">{RestaurantInfo.notes || "N/A"}</Descriptions.Item>
					</Descriptions>
				</div>
				<div className="right">
					<Table columns={columns} dataSource={data} />
				</div>
			</container>
		</>
	);
}
