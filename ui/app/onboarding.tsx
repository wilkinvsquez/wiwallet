import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Colors, Spacing, Border } from "@/constants/theme";
import { useAlert } from "@/context/alert.context";
import api from "@/services/api.service";

export default function Onboarding() {
	const { showAlert } = useAlert();
	const [salary, setSalary] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleContinue() {
		if (!salary) {
			showAlert("Por favor ingresa tu salario mensual", "error");
			return;
		}

		const numSalary = parseFloat(salary);
		if (isNaN(numSalary) || numSalary <= 0) {
			showAlert("Ingresa un salario válido", "error");
			return;
		}

		try {
			setLoading(true);
			await api.put("/users/settings", {
				monthlySalary: numSalary,
				hasCompletedOnboarding: true,
			});
			showAlert("¡Configuración guardada!", "success");
			router.replace("/(main)/home");
		} catch (error: any) {
			showAlert(error, "error");
		} finally {
			setLoading(false);
		}
	}

	return (
		<LinearGradient
			colors={[
				Colors.accent.cream,
				Colors.accent.beige,
				Colors.primary.mint,
			]}
			style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.content}>
				<View style={styles.card}>
					{/* Icon */}
					<View style={styles.iconContainer}>
						<LinearGradient
							colors={[
								Colors.primary.emerald,
								Colors.primary.forest,
							]}
							style={styles.iconGradient}>
							<Text style={styles.emoji}>💰</Text>
						</LinearGradient>
					</View>

					{/* Title */}
					<Text style={styles.title}>¡Bienvenido a WiWallet!</Text>
					<Text style={styles.subtitle}>
						Para comenzar, cuéntanos cuál es tu salario mensual
						bruto
					</Text>

					{/* Salary Input */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Salario Mensual Bruto</Text>
						<View style={styles.salaryInputContainer}>
							<Text style={styles.currencySymbol}>₡</Text>
							<TextInput
								style={styles.salaryInput}
								placeholder='850000'
								value={salary}
								onChangeText={setSalary}
								keyboardType='numeric'
								placeholderTextColor={Colors.neutral.slate100}
							/>
						</View>
						<Text style={styles.hint}>
							💡 Usaremos este dato para calcular tus deducciones
							de CCSS e Impuesto de Renta
						</Text>
					</View>

					{/* Continue Button */}
					<TouchableOpacity
						onPress={handleContinue}
						disabled={loading}
						activeOpacity={0.8}>
						<LinearGradient
							colors={[
								Colors.primary.emerald,
								Colors.primary.forest,
							]}
							style={styles.button}>
							{loading ? (
								<ActivityIndicator color='white' />
							) : (
								<Text style={styles.buttonText}>Continuar</Text>
							)}
						</LinearGradient>
					</TouchableOpacity>

					{/* Skip Button */}
					<TouchableOpacity
						onPress={() => router.replace("/(main)/home")}
						style={styles.skipBtn}>
						<Text style={styles.skipText}>Saltar por ahora</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: Spacing.xl,
	},
	card: {
		backgroundColor: "white",
		borderRadius: Border.radius.xxl,
		padding: Spacing.xxl,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.15,
		shadowRadius: 20,
		elevation: 10,
	},
	iconContainer: {
		alignSelf: "center",
		marginBottom: Spacing.lg,
	},
	iconGradient: {
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	emoji: {
		fontSize: 40,
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		color: Colors.neutral.slate800,
		textAlign: "center",
		marginBottom: Spacing.sm,
	},
	subtitle: {
		fontSize: 16,
		color: Colors.neutral.slate600,
		textAlign: "center",
		marginBottom: Spacing.xxl,
		lineHeight: 24,
	},
	inputContainer: {
		marginBottom: Spacing.xl,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		color: Colors.neutral.slate100,
		marginBottom: Spacing.sm,
	},
	salaryInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.neutral.slate50,
		borderWidth: 2,
		borderColor: Colors.neutral.slate200,
		borderRadius: Border.radius.lg,
		paddingHorizontal: Spacing.md,
		marginBottom: Spacing.sm,
	},
	currencySymbol: {
		fontSize: 28,
		fontWeight: "700",
		color: Colors.primary.forest,
		marginRight: Spacing.sm,
	},
	salaryInput: {
		flex: 1,
		fontSize: 28,
		fontWeight: "700",
		color: Colors.neutral.slate800,
		paddingVertical: Spacing.md,
	},
	hint: {
		fontSize: 14,
		color: Colors.neutral.slate500,
		lineHeight: 20,
	},
	button: {
		padding: 18,
		borderRadius: Border.radius.lg,
		alignItems: "center",
		marginBottom: Spacing.md,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "700",
	},
	skipBtn: {
		padding: Spacing.sm,
		alignItems: "center",
	},
	skipText: {
		fontSize: 16,
		color: Colors.neutral.slate500,
		fontWeight: "600",
	},
});
