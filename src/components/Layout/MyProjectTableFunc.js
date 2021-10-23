import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tag, Modal } from "antd";

import axios from "axios";
import { formatDate } from "data/util";
import toast from "react-hot-toast";
import { useHistory } from "react-router";

async function deleteProject(id) {
	const response = await axios.delete(`project/${id}`);
	return response;
}

export default function MyProjectTableFunc() {
	const history = useHistory();
	const [state, setState] = useState({
		searchText: "",
		searchedColumn: "",
		data: [],
		searchInput: "",
	});

	const getProject = async () => {
		const response = await axios.get("project");
		setState({ data: response.result });
	};

	useEffect(() => {
		getProject();
	}, []);

	//fungsi showConfirm untuk delete data
	function showDelete(id) {
		Modal.confirm({
			title: "Apakah kamu ingin menghapus project ini?",
			onOk() {
				// Panggil fungsi delete di sini
				// let isi = [state.data]; // set seluruh isi data project
				let filtered = state.data.filter((data) => data.id !== id);

				//Proses delete
				toast.success(`Project berhasil dihapus`);
				setState({ data: filtered });
				deleteProject(id);
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
			render: (text, record, index) => {
				return <span>{index + 1}</span>;
			},
		},
		{
			title: "Nama Project",
			dataIndex: "nama_project",
			key: "nama_project",
			width: "auto",
		},
		{
			title: "Tanggal Mulai",
			dataIndex: "tanggal_mulai",
			key: "tanggal_mulai",
			width: "20%",

			render: (text) => formatDate(text),
		},
		{
			title: "Kategori Project",
			dataIndex: "kategori_project",
			key: "kategori_project",
			width: "18%",
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
			title: "Action",
			dataIndex: "action",
			render: (text, record) => (
				<Space size="small">
					<Button onClick={() => history.push(`/dashboard/member/buat-project/${record.id}`)}>Detail</Button>
					<Button type="primary" onClick={() => history.push(`/dashboard/member/buat-project/${record.id}`)}>
						Edit
					</Button>
					<Button type="danger" onClick={() => showDelete(record.id)}>
						Delete
					</Button>
				</Space>
			),
		},
	];
	return <Table columns={columns} dataSource={state.data} />;
}
