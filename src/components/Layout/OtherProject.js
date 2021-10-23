import React from "react";
import axios from "axios";
import {Card, Descriptions} from 'antd';
import { useQuery } from "react-query";
import { getUserSession } from "data/util";

async function getOtherProject() {
  const response = await axios.get("project");
  return response;
}

async function deleteProject(id) {
  const response = await axios.delete(`project/${id}`);
  return response;
}

function OtherProject() {
  const { data, status } = useQuery("project", getOtherProject);

  const filterUser = data.filter((value) => {
    return value.collaborator_user_id.includes(getUserSession().username);
  });

  console.log(`Check: `, filterUser);

  return (
    <div>
      {status === "loading" && <div> Loading Data</div>}
      {status === "error" && <div> Error Fetching Data</div>}
      {status === "success" &&
        (filterUser.length <= 0 ? (
          <div>Kamu belum bergabung dalam suatu project</div>
        ) : (
          <div>
            {filterUser.map((filtered) => {
              const { id, kategori_project, nama_project, tanggal_mulai, link_trello, deskripsi_project, collaborator_user_id, admin } = filtered;
              return (
                <MyProjectCard
                  key={id}
                  category={kategori_project}
                  name={nama_project}
                  date={tanggal_mulai}
                  description={deskripsi_project}
                  link={link_trello}
                  admin={admin}
                  collaborator={collaborator_user_id.map((col) => `${col}, `)}
                  btn_click={() => {
                    deleteProject(id);
                  }}
                />
              );
            })}
          </div>
        ))}
    </div>
  );
}

function MyProjectCard(props) {
  const { category, name, date, description, collaborator, link, admin } = props;
  return (
    <Card style={{ marginBottom: "1.5rem" }}>
      <Descriptions
        bordered
        size="small"
        // extra={
        //   <Button type="danger" onClick={props.btn_click}>
        //     Hapus
        //   </Button>
        // }
      >
        <Descriptions.Item label="Kategori Project" span={24}>
          {category}
        </Descriptions.Item>
        <Descriptions.Item span={24} label="Nama Project">
          {name}
        </Descriptions.Item>
        <Descriptions.Item span={24} label="Tanggal Mulai">
          {date}
        </Descriptions.Item>
        <Descriptions.Item span={24} label="Deskripsi Project">
          {description}
        </Descriptions.Item>
        <Descriptions.Item span={24} label="Link Trello">
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </Descriptions.Item>
        <Descriptions.Item span={24} label="Admin">
          {admin}
        </Descriptions.Item>
        <Descriptions.Item span={24} label="Kolaborator">
          {collaborator}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

export default OtherProject;
