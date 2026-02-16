import React, { useState } from "react";
import {
	View,
	TextInput,
	TouchableOpacity,
	Text,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/auth.context";
import { Colors } from "../constants/theme";
import { loginStyles as styles } from "../styles/login.styles";
import { router } from "expo-router";
import { useAlert } from "../context/alert.context";
import { validateEmail } from "@/utils/validations";

export default function Login() {
	const { signIn } = useAuth();
	const { showAlert } = useAlert();
	const [email, setEmail] = useState("admin@wiwallet.com");
	const [password, setPassword] = useState("123456");
	const [loading, setLoading] = useState(false);

	/**
	 * Method to handle the login
	 */
	async function handleLogin() {
		if (!validateEmail(email)) {
			showAlert("Ingresa un correo electrónico válido", "error");
			return;
		}
		if (!password) {
			showAlert("Ingresa tu contraseña", "error");
			return;
		}
		try {
			setLoading(true);
			await signIn({ email, password });
			showAlert("¡Bienvenido de nuevo!", "success");
		} catch (error: any) {
			setLoading(false);
			showAlert(error, "error");
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
			{/* KeyboardAvoidingView to handle the keyboard */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.content}>
				{/* Glass card for the login form */}
				<View style={styles.glassCard}>
					<View style={styles.iconContainer}>
						{/* Icon with gradient */}
						<LinearGradient
							colors={[
								Colors.primary.emerald,
								Colors.primary.forest,
							]}
							style={styles.iconGradient}>
							<Text style={styles.emoji}>🌿</Text>
						</LinearGradient>
					</View>

					<Text style={styles.title}>WiWallet</Text>
					<Text style={styles.subtitle}>
						Tu paz mental financiera comienza con cada decisión
					</Text>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={styles.input}
							placeholder='tu@email.com'
							placeholderTextColor={Colors.neutral.slate400}
							value={email}
							onChangeText={setEmail}
							autoCapitalize='none'
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Contraseña</Text>
						<TextInput
							style={styles.input}
							placeholder='••••••••'
							placeholderTextColor={Colors.neutral.slate400}
							value={password}
							onChangeText={setPassword}
							secureTextEntry
						/>
					</View>
					{/* Login button */}
					<TouchableOpacity
						onPress={handleLogin}
						disabled={loading}
						activeOpacity={0.8}>
						<LinearGradient
							colors={[Colors.primary.forest, "#065f46"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={styles.button}>
							{loading ? (
								<ActivityIndicator
									color={Colors.neutral.white}
								/>
							) : (
								<Text style={styles.buttonText}>
									Iniciar sesión
								</Text>
							)}
						</LinearGradient>
					</TouchableOpacity>
					{/* Forgot password button */}
					<TouchableOpacity style={styles.forgotPass}>
						<Text style={styles.forgotPassText}>
							¿Necesitas ayuda para entrar?
						</Text>
					</TouchableOpacity>
				</View>
				{/* Footer with sign up button */}
				<View style={styles.footer}>
					<Text style={styles.footerText}>¿Eres nuevo aquí? </Text>
					<TouchableOpacity onPress={() => router.push("/register")}>
						<Text style={styles.signUpText}>Crea tu cuenta</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</LinearGradient>
	);
}
