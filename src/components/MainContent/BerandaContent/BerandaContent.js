import React, { useState, useEffect, Fragment } from "react";
import { Table, Tag, Spin, Button, Tooltip } from "antd";
import { getUser, updateEnrollmentStatus } from "data/dataFetch";
import { formatDate } from "data/util";
import { CheckOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";

function onChange(pagination, filters, sorter, extra) {
	console.log("params", pagination, filters, sorter, extra);
}

export default function BerandaContent() {
	const [user, setUser] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setIsloading(true);
		setHasError(false);
		getUser()
			.then((response) => {
				setUser(response.result);
				setIsloading(false);
			})
			.catch((error) => {
				setIsloading(false);
				setHasError(true);
			});
	}, [setUser]);

	const updateStatus = (id) => {
		updateEnrollmentStatus(id, { EnrollmentStatus: "Approved" });
		toast.success("Status berhasil diupdate");
		setInterval(() => {
			window.location.reload(false);
		}, 1000);
	};

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
			title: "Nama",
			dataIndex: "NamaLengkap",
			key: "nama",
			sortDirections: ["descend"],
		},
		{
			title: "Email",
			dataIndex: "Email",
			key: "email",
			width: "18%",
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
			title: "Topik Diminati",
			dataIndex: "TopikDiminati",
			width: "15%",
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
			onFilter: (value, record) => record.TopikDiminati.indexOf(value) === 0,
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
		{
			title: "Status",
			dataIndex: "EnrollmentStatus",
			width: "15%",
			filters: [
				{
					text: "Waiting for Approval",
					value: "Waiting for Approval",
				},
				{
					text: "Approved",
					value: "Approved",
				},
			],
			onFilter: (value, record) => record.EnrollmentStatus.indexOf(value) === 0,
		},
		{
			title: "Aksi",
			dataIndex: "aksi",
			width: "10%",
			render: (text, record, index) => {
				return (
					<Tooltip title="Approve">
						<Button
							type="primary"
							shape="circle"
							onClick={() => {
								if (record.EnrollmentStatus !== "Approved") {
									updateStatus(record.ID);
								}
							}}
						>
							<CheckOutlined />
						</Button>
					</Tooltip>
				);
			},
		},
	];

	return (
		<Fragment>
			{hasError && <p>Something went wrong</p>}
			{isLoading ? <Spin tip="loading" /> : <Table columns={columns} dataSource={user} size="small" onChange={onChange} />}
		</Fragment>
	);

	// }
}
