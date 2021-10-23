import React from "react";
import { Card, Form, Input, Button, Row, Col, Select } from "antd";
import { Link, useHistory } from "react-router-dom";
import Logo from "assets/images/logo.svg";
import "./Login.css";
import toast from "react-hot-toast";
import { postRegister } from "data/dataFetch";

const { Option } = Select;

function Register() {
	const history = useHistory();

	const onFinish = (values) => {
		console.log(values);
		if (values.password !== values.password_confirm) {
			toast.error("Password tidak sesuai");
			// 	setInterval(() => {
			// 		window.location.reload(false);
			// 	}, 1000);
		} else {
			const dataMauDiPush = {
				namaLengkap: values.NamaLengkap,
				email: values.Email,
				password: values.password,
				topikDiminati: values.TopikDiminati,
			};
			postRegister(dataMauDiPush);
			toast.success(`Registrasi berhasil`);
			setTimeout(() => {
				history.push("/");
			}, 2000);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<Card style={{ width: 500 }} className="login-card">
				<h3 className="login-title">Register</h3>
				<div className="brand-container">
					<img src={Logo} alt="brand" className="brand-logo" />
					<h5 className="brand-text">Banking Innovation CoCreate Platform</h5>
				</div>
				<Form style={{ width: 400 }} layout="vertical" name="basic" initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
					<Form.Item
						className="form-item"
						label="Nama Lengkap"
						name="NamaLengkap"
						rules={[
							{
								required: true,
								message: "Nama Lengkap wajib diisi!",
							},
						]}
					>
						<Input placeholder="Nama Lengkap" />
					</Form.Item>
					<Form.Item
						className="form-item"
						label="Email"
						name="Email"
						rules={[
							{
								required: true,
								type: "email",
								message: "Email wajib diisi!",
							},
						]}
					>
						<Input placeholder="Email" />
					</Form.Item>

					<Form.Item
						className="form-item"
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Password wajib diisi!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						className="form-item"
						label="Konfirmasi Password"
						name="password_confirm"
						rules={[
							{
								required: true,
								message: "Password wajib diisi!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="TopikDiminati"
						label="Topik Diminati"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select
							showSearch
							// style={{ width: 200 }}
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

					<Form.Item className="form-item">
						<Button type="primary" htmlType="submit" className="btn-login-submit">
							Register
						</Button>
					</Form.Item>
				</Form>
				<Row style={{ marginTop: 16 }}>
					<Col span={24} style={{ textAlign: "center" }}>
						Sudah punya akun? <Link to="/">login disini</Link>
					</Col>
				</Row>
			</Card>
		</div>
	);
}

export default Register;
