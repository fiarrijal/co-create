import React, { Fragment } from "react";
import { Card } from "antd";
import Badge from "components/Badge/Badge";
import { useParams } from "react-router";
import { formatDate } from "data/util";
import { useQuery } from "react-query";
import { getArticleById } from "data/dataFetch";

function Article() {
	let { id } = useParams();
	const { data, status } = useQuery(["artikel", id], () => getArticleById(id));

	if (status === "loading") {
		return "Loading";
	}

	return (
		<Fragment>
			<Card>
				<h1 className="title" style={{ fontSize: "1.75rem", fontWeight: "700" }}>
					{data.result.Judul}
				</h1>
				<div style={{ marginBottom: "12px" }}>
					<Badge bgColor="green" value={data.result.Kategori} />
				</div>
				<div style={{ marginBottom: "12px" }}>
					<span className="tanggal" style={{ color: "grey", fontSize: "0.75rem", marginRight: "12px" }}>
						{formatDate(data.result.CreatedAt)}
					</span>
					<span className="author" style={{ color: "grey", fontSize: "0.75rem" }}>
						{data.result.UserName}
					</span>
				</div>
				<p>{data.result.IsiArtikel}</p>
			</Card>
		</Fragment>
	);
}

export default Article;
