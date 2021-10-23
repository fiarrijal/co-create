import React, { useState, useEffect, Fragment } from "react";
import { Table, Tag, Spin, Space, Modal } from "antd";
import { ButtonDelete, ButtonDetail, ButtonUpdate } from "components/Button/ButtonAction";
import { getArticle, userData, deleteArticle } from "data/dataFetch";
import { formatDate } from "data/util";
import { useHistory } from "react-router";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";

function onChange(pagination, filters, sorter, extra) {
	console.log("params", pagination, filters, sorter, extra);
}

export default function TableArticleSaya() {
	const history = useHistory();
	const [article, setArticle] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setIsloading(true);
		setHasError(false);
		getArticle()
			.then((response) => {
				const filtered = response.result.filter((item) => {
					return item.UserEmail === userData.Email;
				});
				console.log(userData);
				setArticle(filtered);
				setIsloading(false);
			})
			.catch((error) => {
				setIsloading(false);
				setHasError(true);
			});
	}, [setArticle]);

	//fungsi showConfirm untuk delete data
	function showConfirm(id) {
		console.log("oke");
		Modal.confirm({
			title: "Apakah kamu ingin menghapus artikel ini??",
			icon: <ExclamationCircleOutlined />,
			onOk() {
				// Panggil fungsi delete di sini
				let isi = article; // set seluruh isi data artikel
				let filtered = isi.filter((data) => data.ID !== id);

				//Proses delete
				toast.success(`Artikel berhasil dihapus`);
				setArticle(filtered);
				deleteArticle(id);
				history.push("/dashboard/member/artikel-saya");
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}

	const columns = [
		{
			title: "No",
			dataIndex: "no",
			width: "5%",
			render: function (text, record, index) {
				return <span>{index + 1}</span>;
			},
		},

		{
			title: "Judul",
			dataIndex: "Judul",
			sortDirections: ["descend"],
		},
		{
			title: "Tanggal",
			dataIndex: "CreatedAt",
			width: "15%",
			render: function (text, record, index) {
				return <span>{formatDate(text)}</span>;
			},
		},
		{
			title: "Kategori",
			dataIndex: "Kategori",
			width: "20%",
			filters: [
				{
					text: "Go Green",
					value: "Go Green",
				},
				{
					text: "Pengembangan Teknologi",
					value: "Pengembangan Teknologi",
				},
				{
					text: "Sosial & Kemanusiaan",
					value: "Sosial & Kemanusiaan",
				},
			],
			onFilter: (value, record) => record.Kategori.indexOf(value) === 0,
			render: (text, record) => {
				let color = "volcano";
				if (text === "Go Green") {
					color = "green";
				} else if (text === "Pengembangan Teknologi") {
					color = "blue";
				}
				return (
					<Tag color={color} key={record.key}>
						{text}
					</Tag>
				);
			},
		},
		{ title: "Penulis", dataIndex: "UserName", width: "15%" },
		{
			title: "Aksi",
			dataIndex: "aksi",
			width: "15%",
			render: (text, record, index) => {
				return (
					<Space>
						<ButtonDetail onClick={() => history.push(`/dashboard/member/artikel/${record.ID}`)} />
						<ButtonUpdate onClick={() => history.push(`/dashboard/member/post-artikel/${record.ID}`)} />
						<ButtonDelete onClick={() => showConfirm(record.ID)} />
					</Space>
				);
			},
		},
	];

	return (
		<Fragment>
			{hasError && <p>Something went wrong</p>}
			{isLoading ? (
				<Spin tip="loading" />
			) : (
				<div>
					<h2>Tabel Artikel Saya</h2>
					<Table columns={columns} dataSource={article} size="small" onChange={onChange} />
				</div>
			)}
		</Fragment>
	);

	// }
}
