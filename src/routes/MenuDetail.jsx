import { useParams } from "react-router-dom";

export default function MenuDetail() {
	const params = useParams();
	return <div>MenuDetail {params.menuId}</div>;
}
