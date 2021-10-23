import React, { useState, useEffect, Fragment } from "react";
import { Table, Tag, Spin, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ButtonDetail } from "components/Button/ButtonAction";
import { getArticle } from "data/dataFetch";
import { formatDate } from "data/util";
import { useHistory } from "react-router";

function onChange(pagination, filters, sorter, extra) {
	console.log("params", pagination, filters, sorter, extra);
}

export default function TableArticleHome() {
	const history = useHistory();
	const [article, setArticle] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setIsloading(true);
		setHasError(false);
		getArticle()
			.then((response) => {
				setArticle(response.result);
				setIsloading(false);
			})
			.catch((error) => {
				setIsloading(false);
				setHasError(true);
			});
	}, [setArticle]);

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
			filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
				return (
					<>
						<Input
							autoFocus
							placeholder="Type here"
							value={selectedKeys[0]}
							onChange={(e) => {
								setSelectedKeys(e.target.value ? [e.target.value] : []);
								confirm({ closeDropdown: false });
							}}
							onPressEnter={() => {
								confirm();
							}}
							onBlur={() => {
								confirm();
							}}
						></Input>
						{/* <Button
                     onClick={() => {
                        confirm();
                     }}
                  >
                     Search
                  </Button>
                  <Button
                     onClick={() => {
                        clearFilters();
                     }}
                     type="danger"
                  >
                     Clear
                  </Button> */}
					</>
				);
			},
			filterIcon: () => {
				return <SearchOutlined />;
			},
			onFilter: (value, record) => {
				return record.Judul.toLowerCase().includes(value.toLowerCase());
			},
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
					<h2>Tabel Artikel</h2> <Table columns={columns} dataSource={article} size="small" onChange={onChange} />
				</div>
			)}
		</Fragment>
	);

	// }
}
