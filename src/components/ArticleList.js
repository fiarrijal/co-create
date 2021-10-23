import { Card, Space } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
// import { useQuery } from "react-query";
import { formatDate } from "data/util";
import Badge from "components/Badge/Badge";
import { getArticle } from "data/dataFetch";

function ArticleList() {
	const [data, setData] = useState([]);
	// const { data, status } = useQuery("artikel", getArticle);
	let history = useHistory();

	useEffect(() => {
		getArticle().then((response) => setData(response));
	}, []);

	const { result, status } = data;

	return (
		<div>
			{status === true && (
				<div>
					<Space wrap>
						{result.map((item) => {
							let color = "red";
							if (item.Kategori === "Go Green") {
								color = "green";
							}
							if (item.Kategori === "Pengembangan Teknologi") {
								color = "blue";
							}
							if (item.Kategori === "Sosial & Kemanusiaan") {
								color = "blueviolet";
							}

							return (
								<ArticleCard
									key={item.ID}
									moveTo={() => history.push(`/dashboard/member/artikel/${item.id}`)}
									judul={item.Judul}
									tanggal={formatDate(item.CreatedAt)}
									kategori={item.Kategori}
									isi_artikel={item.IsiArtikel}
									user={item.UserName}
									badge_color={color}
								/>
							);
						})}
					</Space>
					{/* <Pagination defaultCurrent={1} defaultPageSize={2} total={data.length} /> */}
				</div>
			)}
		</div>
	);
}

function ArticleCard(props) {
	return (
		<Card
			style={{ width: 500 }}
			title={
				<Fragment>
					<span to="/dashboard/member/artikel/" style={{ fontWeight: 700, color: "black", cursor: "" }} onClick={props.moveTo}>
						{props.judul}
					</span>
				</Fragment>
			}
			size="small"
		>
			<Badge bgColor={props.badge_color} value={props.kategori} />
			<p style={{ marginTop: 12 }}>{props.isi_artikel.substr(0, 100)}...</p>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<span style={{ color: "grey", fontSize: "0.75rem" }}>{props.user}</span>
				<span style={{ color: "grey", fontSize: "0.75rem" }}>{props.tanggal}</span>
			</div>
		</Card>
	);
}

export default ArticleList;
