import React, { Fragment, useEffect, useState } from "react";
import { Select } from "antd";
import { getUser, userData } from "data/dataFetch";

const { Option } = Select;

function onBlur() {
	// console.log("blur");
}

function onFocus() {
	// console.log("focus");
}

function onSearch(val) {
	// console.log("search:", val);
}

export default function SelectSingleInvitation(props) {
	const [user, setUser] = useState([]);

	useEffect(() => {
		getUser()
			.then((response) => {
				const data = response.result;
				const userMap = data
					.filter((item) => item.Email !== userData.Email)
					.map((item) => {
						return { label: `${item.NamaLengkap} (${item.Email})`, value: item.Email };
					});
				setUser(userMap);
			})
			.catch((err) => console.log(err.message));
	}, []);

	return (
		<Fragment>
			<Select
				showSearch
				style={{ width: 200 }}
				placeholder="Pilih member"
				optionFilterProp="children"
				onChange={props.onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onSearch={onSearch}
				filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
			>
				{user?.map((item) => {
					return (
						<Option key={item.value} value={item.value}>
							{item.label}
						</Option>
					);
				})}
			</Select>
		</Fragment>
	);
}
