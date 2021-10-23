import React, { useState, useEffect } from "react";
import { Descriptions, Button, Card, Row, Col, Space } from "antd";
import { formatDate } from "data/util";
import toast from "react-hot-toast";
import { userData, getProject, acceptInvitation, ignoreInvitation } from "data/dataFetch";

function CollabInvitation() {
	const [isUpdate, setIsUpdate] = useState(false);

	// Untuk menampung data project yg difetch melalui axios
	const [data, setData] = useState([]);

	//Fungsi untuk refetch data project melalui useEffect
	const toggleUpdate = () => {
		setIsUpdate(!isUpdate);
	};

	// Fetch data project

	useEffect(() => {
		getProject()
			.then((response) => {
				const data = response.result;
				const filtered = data.filter((value) => value.InvitedUser); // filter utk eliminasi project yang InvitedUser nya null

				//Filter project yang InvitedUser Emailnya sama dengan email yang login
				const newFiltered = filtered.filter((item) => item.InvitedUser.map((item) => item.Email).includes(userData.Email));

				setData(newFiltered);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [isUpdate]);

	return (
		<div>
			<h2>Undangan Kolaborasi</h2>
			{data.length === 0 || data === undefined ? (
				<span>Anda tidak memiliki undangan project</span>
			) : (
				data.map((value) => {
					const { ID, KategoriProject, NamaProject, TanggalMulai, DeskripsiProject, ProjectAdmin } = value;

					return (
						<CollabCard
							key={ID}
							name={NamaProject}
							category={KategoriProject}
							date={formatDate(TanggalMulai)}
							description={DeskripsiProject}
							admin={ProjectAdmin.NamaLengkap}
							onAccept={() => {
								acceptInvitation(ID);
								toast.success(`Anda bergabung dalam project ${NamaProject}`);
								toggleUpdate();
							}}
							onDeny={() => {
								ignoreInvitation(ID);
								toast.success(`Anda menolak bergabung dalam project ${NamaProject}`);
								toggleUpdate();
							}}
						/>
					);
				})
			)}
		</div>
	);
}

function CollabCard(props) {
	const { category, name, date, description, admin, onAccept, onDeny } = props;
	return (
		<Card style={{ marginBottom: "1.5rem" }}>
			<Descriptions bordered column={1} size="small" style={{ marginBottom: "1rem" }}>
				<Descriptions.Item label="Kategori Project" span={1}>
					{category}
				</Descriptions.Item>
				<Descriptions.Item span={1} label="Nama Project">
					{name}
				</Descriptions.Item>
				<Descriptions.Item span={1} label="Tanggal Mulai">
					{date}
				</Descriptions.Item>
				<Descriptions.Item span={1} label="Deskripsi Project">
					{description}
				</Descriptions.Item>
				<Descriptions.Item span={1} label="Admin">
					{admin}
				</Descriptions.Item>
			</Descriptions>
			<Row>
				<Col span={8} offset={16} style={{ display: "flex", flexFlow: "row-reverse" }}>
					<Space>
						<Button type="danger" onClick={onDeny}>
							Tolak
						</Button>
						<Button style={{ backgroundColor: "green", color: "white", border: "none" }} onClick={onAccept}>
							Bergabung
						</Button>
					</Space>
				</Col>
			</Row>
		</Card>
	);
}
export default CollabInvitation;
