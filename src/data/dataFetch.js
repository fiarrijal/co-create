import axios from "axios";
import jwtDecode from "jwt-decode";

// decode jwt token to get user login data
export const userData = sessionStorage.getItem("token") !== null ? jwtDecode(sessionStorage.getItem("token")) : null;
console.log(userData);

// Fetch Register

export const postRegister = (data) => {
	return axios.post("register", data);
};

// Fetch login
export const postLogin = (data) => {
	return axios.post("login", data);
};

// Update Enrollment Status

export const updateEnrollmentStatus = (id, data) => {
	return axios.put(`enrollment_status/${id}`, data);
};

//Fetch user
export const getUser = () => {
	return axios.get("user");
};

export const getUserById = async (id) => {
	return await axios.get(`user/${id}`);
};

// Fetch artikel
export const getArticle = () => {
	return axios.get("artikel");
};

export const getArticleById = async (id) => {
	return await axios.get(`artikel/${id}`);
};

export const postArticle = (data) => {
	return axios.post("artikel", data);
};

export const deleteArticle = (id) => {
	return axios.delete(`artikel/${id}`);
};

export const updateArticle = (id, data) => {
	return axios.put(`artikel/${id}`, data);
};

// Fetch project
export const getProject = () => {
	return axios.get("project");
};

export const getProjectById = async (id) => {
	return await axios.get(`project/${id}`);
};

export const postProject = (data) => {
	return axios.post("project", data);
};

export const deleteProject = (id) => {
	return axios.delete(`project/${id}`);
};

export const updateProject = (id, data) => {
	return axios.put(`project/${id}`, data);
};

export const acceptInvitation = (id) => {
	return axios.post(`accept/${id}`);
};

export const ignoreInvitation = (id) => {
	return axios.post(`ignore/${id}`);
};

export const inviteProject = (id, data) => {
	return axios.post(`invite/${id}`, data);
};
