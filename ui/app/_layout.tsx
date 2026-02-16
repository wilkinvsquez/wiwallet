import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";

import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider, useAuth } from "@/context/auth.context";
import { AlertProvider } from "@/context/alert.context";

/**
 * Method to handle the root layout navigation
 * @returns JSX.Element
 */
function RootLayoutNav() {
	const colorScheme = useColorScheme();
	const { signed, loading } = useAuth();

	useEffect(() => {
		if (loading) return;

		if (!signed) {
			router.replace("/login");
		} else {
			router.replace("/(main)/home");
		}
	}, [signed, loading]);

	if (loading) return null;

	return (
		<ThemeProvider
			value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name='index' />
				<Stack.Screen name='login' />
				<Stack.Screen name='register' />
				<Stack.Screen name='onboarding' />
				<Stack.Screen name='(main)' />
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	);
}

/**
 * Method to handle the root layout
 * @returns JSX.Element
 */
export default function RootLayout() {
	return (
		<AuthProvider>
			<AlertProvider>
				<RootLayoutNav />
			</AlertProvider>
		</AuthProvider>
	);
}
