import React from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import axios from "axios";

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
	const [fetching, setFetching] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const fetchRef = React.useRef(0);
	const debounceFetcher = React.useMemo(() => {
		const loadOptions = (value) => {
			fetchRef.current += 1;
			const fetchId = fetchRef.current;
			setOptions([]);
			setFetching(true);
			fetchOptions(value).then((newOptions) => {
				if (fetchId !== fetchRef.current) {
					// for fetch callback order
					return;
				}

				setOptions(newOptions);
				setFetching(false);
			});
		};

		return debounce(loadOptions, debounceTimeout);
	}, [fetchOptions, debounceTimeout]);
	return <Select labelInValue filterOption={false} onSearch={debounceFetcher} notFoundContent={fetching ? <Spin size="small" /> : null} {...props} options={options} />;
} // Usage of DebounceSelect

async function fetchUserList(username) {
	console.log("fetching user", username);
	return axios.get("http://backend-b-co-create.digitalent.rakamin.com/user").then((response) => {
		console.log(response);
		return response.result.map((user) => ({
			label: `${user.Email}`,
			value: user.Email,
		}));
	});
}

export default function SelectContributor(props) {
	// const [val, setVal] = React.useState([]);
	// const mapping = val.map((isi) => {
	// 	const { value } = isi;
	// 	return { value };
	// });
	// console.log(val);

	// console.log(mapping);

	return (
		<DebounceSelect
			mode="multiple"
			// value={val}
			value={props.value}
			placeholder="Pilih Kolaborator"
			fetchOptions={fetchUserList}
			// onChange={(newValue) => {
			// 	setVal(newValue);
			// }}
			onChange={(val) => {
				props.setVal(val);
			}}
			style={{
				width: "100%",
			}}
		/>
	);
}
