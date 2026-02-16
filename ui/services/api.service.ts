import axios from "axios";

const api = axios.create({
	baseURL: "http://192.168.1.136:3000",
	timeout: 10000,
});

/**
 * Method to handle the response interceptor
 * @param response any
 * @param error any
 * @returns any
 */
api.interceptors.response.use(
	response => response.data,
	error => {
		const message =
			error.response?.data?.message ||
			"Error de conexión con el servidor";

		return Promise.reject(message);
	},
);

export default api;
