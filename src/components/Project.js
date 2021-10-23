import React from "react";
import { Descriptions, Spin, Button } from "antd";
import { formatDate } from "data/util";
import { Link, useParams } from "react-router-dom";
import { getProjectById } from "data/dataFetch";
import { useQuery } from "react-query";

export default function ProjectQuery() {
	let { id } = useParams();

	const { data, status } = useQuery(["project", id], () => getProjectById(id));

	if (status === "error") {
		return <p>Something went wrong</p>;
	}
	if (status === "loading") {
		return <Spin tip="loading" />;
	}

	if (status === "success") {
		const invitedName =
			data.result.InvitedUser === null
				? "Tidak ada undangan"
				: data.result.InvitedUser.map((item) => {
						return `${item.NamaLengkap}(${item.Email}),`;
				  });

		const CollaboratorName =
			data.result.Collaborator === null
				? "Belum ada kontributor"
				: data.result.Collaborator.map((item) => {
						return `${item.NamaLengkap}(${item.Email}),`;
				  });
		return (
			<Descriptions
				title="Project Detail"
				size="small"
				bordered
				column={1}
				extra={
					<Link to="/dashboard/member/">
						<Button type="primary">Kembali</Button>
					</Link>
				}
			>
				<Descriptions.Item label="Nama Project">{data.result.NamaProject}</Descriptions.Item>
				<Descriptions.Item label="Kategori Project">{data.result.KategoriProject}</Descriptions.Item>
				<Descriptions.Item label="Tanggal Mulai">{formatDate(data.result.TanggalMulai)}</Descriptions.Item>
				<Descriptions.Item label="Link Trello">
					<a href={data.result.LinkTrello} target="_blank" rel="noopener noreferrer">
						{data.result.LinkTrello}
					</a>
				</Descriptions.Item>
				<Descriptions.Item label="Admin">{data.result.ProjectAdmin.NamaLengkap}</Descriptions.Item>
				<Descriptions.Item label="Member yang diundang">{data.result.InvitedUser === null ? "Belum ada undangan" : invitedName}</Descriptions.Item>
				<Descriptions.Item label="Kolaborator">{data.result.Collaborator === null ? "Belum ada kolaborator" : CollaboratorName}</Descriptions.Item>
				<Descriptions.Item label="Deskripsi">{data.result.DeskripsiProject}</Descriptions.Item>
			</Descriptions>
		);
	}
}
