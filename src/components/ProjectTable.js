// import React from 'react';
import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from "react-query";
import axios from "axios";

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
async function getProject() {
  const response = await axios.get("project");
  return response;
}

// const { data, status } = useQuery("project", getProject);
//   let dataMap = [];
//   if (status === "success") {
//     dataMap = data.map((isi) => {
//       const { id: key, tanggal_mulai, kategori_project, nama_project, deskripsi_project, category, name, date, description, collaborator, link, invited_user_id } = isi;
//       const newObj = { key, tanggal_mulai, kategori_project, nama_project, deskripsi_project, category, name, date, description, collaborator, link, invited_user_id };
//       return newObj;
//     });
//   }

export class ProjectTable extends Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
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
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
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

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  // constructor(props) {
  //   super(props)
  //   const { data, status } = useQuery("project", getProject);
    
  //   this.state = {
      
  //     let dataMap = [];
  //     if (status === "success") {
  //       dataMap = data.map((isi) => {
  //         const { id: key, tanggal_mulai, kategori_project, nama_project, deskripsi_project, category, name, date, description, collaborator, link, invited_user_id } = isi;
  //         const newObj = { key, tanggal_mulai, kategori_project, nama_project, deskripsi_project, category, name, date, description, collaborator, link, invited_user_id };
  //         return newObj;
  //       });
  //     }
  //   }
  // }
  
  render() {
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
      // {
      //   title: 'Nama Project',
      //   dataIndex: 'name',
      //   key: 'judul',
      //   width: '30%',
      //   ...this.getColumnSearchProps('name'),
      // },
      // {
      //   title: 'Age',
      //   dataIndex: 'age',
      //   key: 'age',
      //   width: '20%',
      //   ...this.getColumnSearchProps('age'),
      // },
      // {
      //   title: 'Address',
      //   dataIndex: 'address',
      //   key: 'address',
      //   ...this.getColumnSearchProps('address'),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortDirections: ['descend', 'ascend'],
      // },
    ];
    return (
      <div>
      <Table columns={columns} dataSource={data} />;    
      </div>
    )
  }
}

export default ProjectTable