import React from "react";
import { useQuery } from "react-query";
import { Table } from "antd";
import axios from "axios";

// const { Paragraph } = Typography;
// const { Panel } = Collapse;

async function getProject() {
  const response = await axios.get("project");
  return response;
}

function ProjectCollapse() {

	// this.state = {
	// 	searchText: "",
	// 	searchedColumn: "",
	// };
	// const 
	// getColumnSearchProps = (dataIndex) => ({
	// 	filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
	// 		<div style={{ padding: 8 }}>
	// 			<Input
	// 				ref={(node) => {
	// 					this.searchInput = node;
	// 				}}
	// 				placeholder={`Search ${dataIndex}`}
	// 				value={selectedKeys[0]}
	// 				onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
	// 				onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
	// 				style={{ marginBottom: 8, display: "block" }}
	// 			/>
	// 			<Space>
	// 				<Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
	// 					Search
	// 				</Button>
	// 				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
	// 					Reset
	// 				</Button>
	// 				<Button
	// 					type="link"
	// 					size="small"
	// 					onClick={() => {
	// 						confirm({ closeDropdown: false });
	// 						this.setState({
	// 							searchText: selectedKeys[0],
	// 							searchedColumn: dataIndex,
	// 						});
	// 					}}
	// 				>
	// 					Filter
	// 				</Button>
	// 			</Space>
	// 		</div>
	// 	),
	// 	filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
	// 	onFilter: (value, record) => (record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ""),
	// 	onFilterDropdownVisibleChange: (visible) => {
	// 		if (visible) {
	// 			setTimeout(() => this.searchInput.select(), 100);
	// 		}
	// 	},
	// 	render: (text) => (this.state.searchedColumn === dataIndex ? <Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[this.state.searchText]} autoEscape textToHighlight={text ? text.toString() : ""} /> : text),
	// });
	
	// handleSearch = (selectedKeys, confirm, dataIndex) => {
	// 	confirm();
	// 	this.setState({
	// 		searchText: selectedKeys[0],
	// 		searchedColumn: dataIndex,
	// 	});
	// };
	
	// handleReset = (clearFilters) => {
	// 	clearFilters();
	// 	this.setState({ searchText: "" });
	// };
	
  const { data, status } = useQuery("project", getProject);
  let dataMap = [];
  if (status === "success") {
    dataMap = data.map((isi) => {
      const { id: key, tanggal_mulai, kategori_project, nama_project, deskripsi_project, category, name, date, description, collaborator, link, invited_user_id } = isi;
      const newObj = { key, tanggal_mulai, kategori_project, nama_project, deskripsi_project, category, name, date, description, collaborator, link, invited_user_id };
      return newObj;
    });
  }

  const columns = [
    {
      title: "Kategori Project",
      key: "kategori_project",

      dataIndex: "kategori_project",
    },
    {
      title: "Judul Project",
      key: "nama_project",

      dataIndex: "nama_project",
    },
    {
      title: "Tanggal Mulai",
      key: "tanggal_mulai",

      dataIndex: "tanggal_mulai",
    },
    {
      title: "Deskripsi Project",
      key: "deskripsi_project",

      dataIndex: "deskripsi_project",
    },
  ];

  return (
    <div>
      {status === "loading" && <div> Loading Data</div>}
      {status === "error" && <div> Error Fetching Data</div>}
      {status === "success" && (
        <div>
          <Table columns={columns} dataSource={dataMap} />
          {/* <ProjectTable /> */}
          {/* {isiData.map((isi) => {
            const { id, kategori_project, nama_project, tanggal_mulai, deskripsi_project } = isi;

            return <BerandaProjectCard key={id} category={kategori_project} name={nama_project} date={formatDate(tanggal_mulai)} description={deskripsi_project} />;
          })} */}
        </div>
      )}
    </div>
  );

}

export default ProjectCollapse;
