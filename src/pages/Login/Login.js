import React from "react";
import { Card, Form, Input, Button, Checkbox, Row, Col } from "antd";
import Logo from "assets/images/logo.svg";
import "./Login.css";
import { useHistory, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { postLogin } from "data/dataFetch";

export default function Login() {
	let history = useHistory();
	const onFinish = (values) => {
		console.log(values);
		const data = {
			email: values.email,
			password: values.password,
		};

		postLogin(data)
			.then((response) => {
				const token = response.token; // inisialisasi variabel token
				sessionStorage.setItem("token", token); // simpan token di session storage untuk dipasang di header
				history.push("/dashboard");
				window.location.reload(false);
				toast.success("Anda berhasil login");
			})
			.catch(() => alert("Email & password tidak match"));
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<Card style={{ width: 400 }} className="login-card">
				<h3 className="login-title">Login</h3>
				<div className="brand-container">
					<img src={Logo} alt="brand" className="brand-logo" />
					<h5 className="brand-text">Banking Innovation CoCreate Platform</h5>
				</div>
				<Form
					layout="vertical"
					name="basic"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						className="form-item"
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								// type: "email",
								message: "Email wajib diisi!",
							},
						]}
					>
						<Input />
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
						name="remember"
						valuePropName=""
						// wrapperCol={{
						// 	offset: 8,
						// 	span: 16,
						// }}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item className="form-item">
						<Button type="primary" htmlType="submit" className="btn-login-submit">
							Login
						</Button>
					</Form.Item>
				</Form>

				<Row style={{ marginTop: 16 }}>
					<Col span={24} style={{ textAlign: "center" }}>
						Belum punya akun? <Link to="/register">daftar disini</Link>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
