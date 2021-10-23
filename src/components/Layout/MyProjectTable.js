import React from "react";
import { Table, Input, Button, Space, Tag, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { formatDate } from "data/util";

export default class MyProjectTable extends React.Component {
	state = {
		searchText: "",
		searchedColumn: "",
		data: [],
	};

	async componentDidMount() {
		const res = await axios.get("project");
		this.setState({ data: res.result });
	}

	//fungsi showConfirm untuk delete data
	showDelete(id) {
		Modal.confirm({
			title: "Apakah kamu ingin menghapus project ini?",
			onOk() {
				// Panggil fungsi delete di sini
				// let isi = [this.state.data]; // set seluruh isi data project
				let filtered = this.state.data.filter((data) => data.id !== id);

				//Proses delete
				this.toast.success(`Project berhasil dihapus`);
				this.setState({ data: filtered });
				// deleteProject(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}

	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						console.log(this.searchInput);
						this.searchInput = node;
						console.log(this.searchInput);
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
						Search
					</Button>
					<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							this.setState({
								searchText: selectedKeys[0],
								searchedColumn: dataIndex,
							});
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
		onFilter: (value, record) => (record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ""),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select(), 100);
			}
		},
		render: (text, record) =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[this.state.searchText]} autoEscape textToHighlight={text ? text.toString() : ""} />
			) : (
				text
			),
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: "" });
	};

	render() {
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
				...this.getColumnSearchProps("nama_project"),
			},
			{
				title: "Tanggal Mulai",
				dataIndex: "tanggal_mulai",
				key: "tanggal_mulai",
				width: "20%",
				...this.getColumnSearchProps("tanggal_mulai"),
				render: (text) => formatDate(text),
			},
			{
				title: "Kategori Project",
				dataIndex: "kategori_project",
				key: "kategori_project",
				width: "18%",
				...this.getColumnSearchProps("kategori_project"),
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
						<Button onClick={() => this.props.history.push(`/dashboard/member/buat-project/${record.id}`)}>Detail</Button>
						<Button type="primary" onClick={() => this.props.history.push(`/dashboard/member/buat-project/${record.id}`)}>
							Edit
						</Button>
						<Button type="danger" onClick={() => this.showDelete(record.id)}>
							Delete
						</Button>
					</Space>
				),
			},
		];
		return <Table columns={columns} dataSource={this.state.data} />;
	}
}
