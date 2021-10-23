import React from "react";
import { Button, Tooltip } from "antd";
import { DeleteOutlined, SearchOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

export function ButtonDelete(props) {
	return (
		<Tooltip title="Delete" key="red">
			<Button onClick={props.onClick} type="danger" shape="circle" icon={<DeleteOutlined />} />
		</Tooltip>
	);
}

export function ButtonDetail(props) {
	return (
		<Tooltip title="Detail" key="green">
			<Button onClick={props.onClick} style={{ backgroundColor: "green", color: "#fff" }} shape="circle" icon={<SearchOutlined />} />
		</Tooltip>
	);
}

export function ButtonUpdate(props) {
	return (
		<Tooltip title="Update" key="green">
			<Button onClick={props.onClick} type="primary" shape="circle" icon={<EditOutlined />} />
		</Tooltip>
	);
}

export function ButtonAddInvitation(props) {
	return (
		<Tooltip title="Invite Friend" key="green">
			<Button onClick={props.onClick} style={{ backgroundColor: "purple", color: "#fff" }} shape="circle" icon={<PlusOutlined />} />
		</Tooltip>
	);
}
