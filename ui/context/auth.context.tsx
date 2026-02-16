import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api.service";
import { storage } from "../services/storage.service";

interface AuthContextData {
	signed: boolean;
	user: { email: string; name: string } | null;
	loading: boolean;
	signIn(credentials: any): Promise<void>;
	signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/**
 * Method to handle the auth provider
 * @param children React.ReactNode
 * @returns JSX.Element
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<{ email: string; name: string } | null>(
		null,
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadStorageData() {
			const storageUser = await storage.getItem("wiwallet_user");
			const storageToken = await storage.getItem("wiwallet_token");

			if (storageUser && storageToken) {
				api.defaults.headers.common["Authorization"] =
					`Bearer ${storageToken}`;
				setUser(JSON.parse(storageUser));
			}
			setLoading(false);
		}
		loadStorageData();
	}, []);

	/**
	 * Method to handle the sign in
	 * @param credentials any
	 */
	async function signIn(credentials: any) {
		const response: any = await api.post("/auth/login", credentials);
		const { access_token, user: userData } = response.data;

		setUser(userData);
		api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

		await storage.setItem("wiwallet_token", access_token);
		await storage.setItem("wiwallet_user", JSON.stringify(userData));
	}

	/**
	 * Method to handle the sign out
	 */
	async function signOut() {
		await storage.removeItem("wiwallet_token");
		await storage.removeItem("wiwallet_user");
		setUser(null);
	}

	return (
		<AuthContext.Provider
			value={{ signed: !!user, user, loading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
