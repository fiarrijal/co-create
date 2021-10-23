import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
	//Pengecekan apakah ada data di local storage
	const isAuth = sessionStorage.getItem("token") === null ? false : true;
	console.log(isAuth);

	return (
		<Route
			{...rest}
			render={() => {
				if (isAuth) {
					return children;
				} else {
					return <Redirect to="/login" exact />;
				}
			}}
		/>
	);
};

export default PrivateRoute;
