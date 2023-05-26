import React from 'react';
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout";
// import EmployeeModal from '../Components/Modal/EmployeeModal';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import UserList from '../Pages/User/UserList';
import AxiosProvider from '../Service/AxiosProvider';

const PublicRoutes = () => {
	return (
		<Layout>
			<AxiosProvider>
				<Routes>
					<Route path="/" element={<UserList />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgotpassword' element={<ForgotPassword />} />
					{/* <Route path='/modal' element={<EmployeeModal/>} /> */}
				</Routes>
			</AxiosProvider>
		</Layout>
	)
}

export default PublicRoutes;