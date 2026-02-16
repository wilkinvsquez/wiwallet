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

// 1. Componente interno para manejar la lógica de redirección
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
				<Stack.Screen name='(main)' />
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	);
}

// 2. El componente principal solo envuelve con el Provider
export default function RootLayout() {
	return (
		<AuthProvider>
			<RootLayoutNav />
		</AuthProvider>
	);
}
