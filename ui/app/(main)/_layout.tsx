import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import api from "@/services/api.service";

export default function MainLayout() {
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		checkOnboarding();
	}, []);

	async function checkOnboarding() {
		try {
			const response = await api.get("/users/settings");
			const settings = response.data;

			if (!settings.hasCompletedOnboarding) {
				router.replace("/onboarding");
			}
		} catch (error) {
			console.error("Error checking onboarding:", error);
		} finally {
			setChecking(false);
		}
	}

	if (checking) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='home' />
		</Stack>
	);
}
