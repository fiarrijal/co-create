import React, { useState, useEffect } from "react";
import { Modal, Table, Space, Button } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { formatDate } from "data/util";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import moment from "moment";


const { confirm } = Modal;

async function deleteArticle(id) {
   const response = await axios.delete(`artikel/${id}`);
   return response;
}

async function getArticle() {
   const response = await axios.get("artikel");
   return response;
}

function MyArticle() {
   const { data, status } = useQuery("article", getArticle);
   const history = useHistory();
   const [setArticle] = useState([]);

   useEffect(() => {
      getArticle();
   }, []);

   let dataMap = [];
   if (status === "success") {
      // let i = 0;
      dataMap = data.map((isi) => {
         const { id: key, posting_date, kategori, judul, isi_artikel, id_user } = isi;
         const newObj = { key, posting_date, kategori, judul, isi_artikel, id_user };
         return newObj;
      });

      dataMap.map((el) => {
         let date = moment(new Date(el.posting_date));
         el.posting_date = date.format("DD/MM/YY - hh:mm");
      });
   }

   useEffect(() => {
      getArticle();
   }, []);

   const columns = [
      {
         title: "Kategori Artikel",
         key: "kategori",
         dataIndex: "kategori",
         width: 220,

         // render: (kategori) => (
         //    <>
         //       {kategori((tag) => {
         //          let color = "volcano";
         //          if (tag === "Go Green") {
         //             color = "green";
         //          }
         //          if (tag === "Pengembangan Teknologi") {
         //             color = "geekblue";
         //          }
         //          if (tag === "Sosial & Kemanusiaan") {
         //             color = "blueviolet";
         //          }
         //          return (
         //             <Tag color={color} key={tag}>
         //                {tag.toUpperCase()}
         //             </Tag>
         //          );
         //       })}
         //    </>
         // ),
      },
      {
         title: "Judul Artikel",
         key: "judul",
         dataIndex: "judul",
      },

      {
         title: "Tanggal Post",
         key: "posting_date",
         dataIndex: "posting_date",
         width: 170,
      },

      {
         title: "User",
         key: "id_user",
         dataIndex: "id_user",
         width: 160,
      },
      {
         title: "Action",
         key: "action",
         width: 260,
         render: (text, record) => (
            <Space size="middle">
               <Button
                  type="primary"
                  onClick={() => {
                     history.push(`/dashboard/member/artikel/${record.key}`);
                  }}
               >
                  Detail
               </Button>
               <Button
                  type="primary"
                  onClick={() => {
                     history.push(`/dashboard/member/post-artikel/${record.key}`);
                  }}
               >
                  Edit
               </Button>
               <Button
                  type="danger"
                  onClick={() => {
                     showConfirm(record.key);
                  }}
               >
                  Hapus
               </Button>
            </Space>
         ),
      },
   ];

   function showConfirm(key) {
      confirm({
         title: "Apakah kamu ingin menghapus artikel ini??",
         icon: <ExclamationCircleOutlined />,
         // content: "Some descriptions",
         onOk() {
            // Panggil fungsi delete di sini
            let isi = [...data]; // set seluruh isi data article
            let filtered = isi.filter((data) => data.key !== key);

            //Proses delete
            toast.success(`Artikle berhasil dihapus`);
            setArticle(filtered);
            deleteArticle(key);
         },
         onCancel() {
            console.log("Cancel");
         },
      });
   }

   return (
      <div>
         <h1>Artikel Saya</h1>
         <Table bordered columns={columns} dataSource={dataMap} pagination={{ pageSize: 5 }} />
      </div>
   );
}
export default MyArticle;
