import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const storage = {
	/**
	 * Method to handle the get item
	 * @param key string
	 * @returns Promise<string | null>
	 */
	async getItem(key: string): Promise<string | null> {
		if (Platform.OS === "web") {
			return localStorage.getItem(key);
		}
		return await SecureStore.getItemAsync(key);
	},

	/**
	 * Method to handle the set item
	 * @param key string
	 * @param value string
	 * @returns Promise<void>
	 */
	async setItem(key: string, value: string): Promise<void> {
		if (Platform.OS === "web") {
			localStorage.setItem(key, value);
			return;
		}
		await SecureStore.setItemAsync(key, value);
	},

	/**
	 * Method to handle the remove item
	 * @param key string
	 * @returns Promise<void>
	 */
	async removeItem(key: string): Promise<void> {
		if (Platform.OS === "web") {
			localStorage.removeItem(key);
			return;
		}
		await SecureStore.deleteItemAsync(key);
	},
};
