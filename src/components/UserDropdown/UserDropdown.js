import React from "react";
import { Menu, Dropdown, Space, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./UserDropdown.css";
import { userData } from "data/dataFetch";
import { useHistory } from "react-router";
import toast from "react-hot-toast";

export default function UserDropdown() {
	let history = useHistory();
	const menus = (
		<Menu>
			<Menu.Item key="1" icon={<ExitToAppIcon />}>
				<div
					onClick={() => {
						toast.success("Anda berhasil log out!");
						sessionStorage.clear();
						setTimeout(() => {
							history.push("/");
						}, 500);
					}}
				>
					Sign Out
				</div>

			</Menu.Item>
		</Menu>
	);
	return (
		<Space direction="vertical">
			<Space wrap>
				<Dropdown overlay={menus} placement="bottomRight">
					<div className="header-user">
						<div className="header-user-text">
							<h3 className="user-name">{userData.NamaLengkap}</h3>
						</div>
						<div className="header-image-container">
							<Avatar icon={<UserOutlined />} />
						</div>
					</div>
				</Dropdown>
			</Space>
		</Space>
	);
}
