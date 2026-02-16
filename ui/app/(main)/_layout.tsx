import { Stack } from "expo-router";
import React from "react";
import { Colors } from "@/constants/theme";

export default function MainLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: Colors.accent.cream },
			}}>
			<Stack.Screen name='home' />
		</Stack>
	);
}
