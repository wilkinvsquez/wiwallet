import axios, { isCancel } from "axios";
import { Alert } from "react-native";

const api = axios.create({
	baseURL: "http://192.168.1.136:3000",
	timeout: 10000,
});

api.interceptors.request.use(async config => {
	return config;
});

/**
 * Response Interceptor
 */
api.interceptors.response.use(
	(response: any) => {
		// Si el backend sigue nuestro formato estandarizado
		if (response.data && response.data.success) {
			return response.data; // Esto devuelve { success, statusCode, message, data, timestamp }
		}
		return response.data;
	},
	error => {
		const message =
			error.response?.data?.message ||
			"Error de conexión con el servidor";
		const statusCode = error.response?.status;

		if (!axios.isCancel(error)) {
			Alert.alert(
				`Error ${statusCode || ""}`,
				Array.isArray(message) ? message.join(", ") : message,
			);
		}

		return Promise.reject(error);
	},
);

export default api;
