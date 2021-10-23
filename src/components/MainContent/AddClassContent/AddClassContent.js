import React from "react";
import { Select } from "antd";
import { Form, Input, Button, DatePicker } from "antd";
import { useState } from "react";
import axios from "axios";

import { useHistory, useParams } from "react-router";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { postProject, updateProject } from "data/dataFetch";

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

const { Option } = Select;
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
	required: "${label} harus diisi!",
	types: {
		email: "${label} bukan format email yang valid!",
		number: "${label} harus angka!",
	},
	number: {
		range: "${label} must be between ${min} and ${max}",
	},
};
/* eslint-enable no-template-curly-in-string */

const getProjectById = (id) => {
	return axios.get(`project/${id}`);
};

function AddClassContent() {
	const history = useHistory();
	const { id } = useParams();
	const [date, setDate] = useState("");

	const { data, isLoading, isError, status } = useQuery(["project", id], () => getProjectById(id));

	const filtered =
		data === undefined
			? {
					KategoriProject: "",
					NamaProject: "",
					TanggalMulai: "",
					LinkTrello: "",
					DeskripsiProject: "",
			  }
			: { KategoriProject: data.result.KategoriProject, NamaProject: data.result.NamaProject, LinkTrello: data.result.LinkTrello, DeskripsiProject: data.result.DeskripsiProject };

	const onChange = (date, dateString) => {
		const baru = dateString._d;
		return setDate(`${baru}`);
	};

	const onFinish = (values) => {
		console.log(values);

		if (id === undefined) {
			console.log(values);
			const dataMauDiPush = {
				KategoriProject: values.KategoriProject,
				NamaProject: values.NamaProject,
				TanggalMulai: values.TanggalMulai,
				LinkTrello: values.LinkTrello,
				DeskripsiProject: values.DeskripsiProject,
			};

			postProject(dataMauDiPush);

			history.push("/dashboard/member/project/project-saya");
			toast.success("Sukses Membuat Project");
		} else {
			const dataMauDiUpdate = {
				NamaProject: values.NamaProject,
				LinkTrello: values.LinkTrello,
				DeskripsiProject: values.DeskripsiProject,
			};

			updateProject(id, dataMauDiUpdate);
			history.push("/dashboard/member/project/project-saya");
			toast.success("Data Project Berhasil Diupdate");
		}
	};

	if (isLoading) {
		return "Loading.....";
	}
	if (isError) {
		return "Error!";
	}

	if (status === "success") {
		// console.log(user.value);
		// console.log(userMap[0]);
		// console.log(useraja);
		return (
			<div>
				<h2>{id !== undefined ? `Update Project` : `Buat Project Baru`}</h2>
				<Form
					{...layout}
					name="nest-messages"
					onFinish={onFinish}
					validateMessages={validateMessages}
					initialValues={{
						KategoriProject: filtered.KategoriProject,
						NamaProject: filtered.NamaProject,
						TanggalMulai: filtered.TanggalMulai,
						LinkTrello: filtered.LinkTrello,
						DeskripsiProject: filtered.DeskripsiProject,
					}}
				>
					<Form.Item
						name="KategoriProject"
						label="Kategori Project"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select
							disabled={id !== undefined ? true : false}
							showSearch
							style={{ width: 400 }}
							placeholder="Pilih topik"
							optionFilterProp="children"
							filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
						>
							<Option value="Pengembangan Teknologi">Pengembangan Teknologi</Option>
							<Option value="Go Green">Go Green</Option>
							<Option value="Sosial & Kemanusiaan">Sosial & Kemanusiaan</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="NamaProject"
						label="Nama Project"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					{id === undefined ? (
						<Form.Item
							name="TanggalMulai"
							label="Tanggal Mulai"
							rules={[
								{
									required: "true",
								},
							]}
						>
							<DatePicker width={400} value={date} onChange={onChange} disabled={id !== undefined ? true : false} />
						</Form.Item>
					) : null}

					<Form.Item name="LinkTrello" label="Link Trello">
						<Input />
					</Form.Item>
					<Form.Item name="DeskripsiProject" label="Deskripsi Project">
						<Input.TextArea />
					</Form.Item>
					{/* {id !== undefined ? (
						<Form.Item
							name="InvitedUser"
							label="Undang Member Lain"
							rules={[
								{
									required: false,
								},
							]}
						>
							<SelectContributor setVal={(e) => setUser(e)} />
						</Form.Item>
					) : null} */}

					<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

export default AddClassContent;
