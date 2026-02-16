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

export default function Login() {
	const { signIn } = useAuth();
	const [email, setEmail] = useState("admin@wiwallet.com");
	const [password, setPassword] = useState("123456");
	const [loading, setLoading] = useState(false);

	async function handleLogin() {
		try {
			setLoading(true);
			await signIn({ email, password });
		} catch (err: any) {
			console.log("Login Error:", err);
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
				<View style={styles.glassCard}>
					<View style={styles.iconContainer}>
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

					<TouchableOpacity style={styles.forgotPass}>
						<Text style={styles.forgotPassText}>
							¿Necesitas ayuda para entrar?
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>¿Eres nuevo aquí? </Text>
					<TouchableOpacity>
						<Text style={styles.signUpText}>Crea tu cuenta</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</LinearGradient>
	);
}
