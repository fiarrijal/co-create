import { Form, Button, Modal } from "antd";
import { inviteProject } from "data/dataFetch";
import toast from "react-hot-toast";
import SelectSingleInvitation from "./SelectSingleInvitation";

export default function SingleInvitation(props) {
	const onFinish = (values) => {
		let user = {
			email: values.email,
		};
		console.log(props.dataId);
		console.log("Success:", values);
		inviteProject(props.dataId, user);
		toast.success(`${values.email} berhasil diundang`);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Modal title="Basic Modal" visible={props.visible} onOk={props.onOk} onCancel={props.onCancel}>
			<Form name="basic" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
				<Form.Item
					label="Pilih member yang ingin kamu undang"
					name="email"
					rules={[
						{
							required: true,
							message: "Pilih member lain!",
						},
					]}
				>
					<SelectSingleInvitation />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}
