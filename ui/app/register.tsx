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
import { router } from "expo-router";
import { Colors } from "../constants/theme";
import { loginStyles as styles } from "../styles/login.styles";
import api from "../services/api.service";
import { useAlert } from "../context/alert.context";
import {
	validateName,
	validatePassword,
	validateEmail,
} from "@/utils/validations";

/**
 * Method to handle the register
 * @returns JSX.Element
 */
export default function Register() {
	const { showAlert } = useAlert();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	/**
	 * Method to handle the register
	 */
	async function handleRegister() {
		const newErrors: Record<string, string> = {};

		if (!validateName(name)) newErrors.name = "Nombre demasiado corto";
		if (!validateEmail(email)) newErrors.email = "Email inválido";
		const passCheck = validatePassword(password);
		if (!passCheck.isValid) newErrors.password = passCheck.message;

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			showAlert("Por favor revisa los campos marcados", "error");
			return;
		}

		try {
			setLoading(true);
			await api.post("/auth/register", { name, email, password });
			setLoading(false);
			showAlert("¡Cuenta creada con éxito!", "success");
			setTimeout(() => router.replace("/login"), 1500);
		} catch (err: any) {
			setLoading(false);
			showAlert(err, "error");
		}
	}

	/**
	 * Method to handle the change of the input fields
	 * @param field string
	 * @param value string
	 * @param setter (v: string) => void
	 */
	const handleChange = (
		field: string,
		value: string,
		setter: (v: string) => void,
	) => {
		setter(value);
		if (errors[field]) {
			const updatedErrors = { ...errors };
			delete updatedErrors[field];
			setErrors(updatedErrors);
		}
	};

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
				<View style={styles.glassCard}>
					<View style={styles.iconContainer}>
						{/* Icon with gradient */}
						<LinearGradient
							colors={[
								Colors.primary.emerald,
								Colors.primary.forest,
							]}
							style={styles.iconGradient}>
							<Text style={styles.emoji}>🌱</Text>
						</LinearGradient>
					</View>

					<Text style={styles.title}>Crear Cuenta</Text>
					<Text style={styles.subtitle}>
						Únete a WiWallet y cultiva tu paz financiera
					</Text>

					{/* Name field */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Nombre Completo</Text>
						<TextInput
							style={[
								styles.input,
								errors.name && styles.inputError,
							]}
							placeholder='Juan Pérez'
							value={name}
							onChangeText={v => handleChange("name", v, setName)}
						/>
						{errors.name && (
							<Text style={styles.errorText}>{errors.name}</Text>
						)}
					</View>

					{/* Email field */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={[
								styles.input,
								errors.email && styles.inputError,
							]}
							placeholder='tu@email.com'
							value={email}
							onChangeText={v =>
								handleChange("email", v, setEmail)
							}
							autoCapitalize='none'
						/>
						{errors.email && (
							<Text style={styles.errorText}>{errors.email}</Text>
						)}
					</View>

					{/* Password field */}
					<View style={styles.inputContainer}>
						<Text style={styles.label}>Contraseña</Text>
						<TextInput
							style={[
								styles.input,
								errors.password && styles.inputError,
							]}
							placeholder='••••••••'
							value={password}
							onChangeText={v =>
								handleChange("password", v, setPassword)
							}
							secureTextEntry
						/>
						{errors.password && (
							<Text style={styles.errorText}>
								{errors.password}
							</Text>
						)}
					</View>
					{/* Register button */}
					<TouchableOpacity
						onPress={handleRegister}
						disabled={loading}
						activeOpacity={0.8}>
						<LinearGradient
							colors={[Colors.primary.forest, "#065f46"]}
							style={styles.button}>
							{loading ? (
								<ActivityIndicator color='white' />
							) : (
								<Text style={styles.buttonText}>
									Registrarme
								</Text>
							)}
						</LinearGradient>
					</TouchableOpacity>
				</View>
				{/* Footer with sign up button */}
				<View style={styles.footer}>
					<Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
					<TouchableOpacity onPress={() => router.back()}>
						<Text style={styles.signUpText}>Inicia sesión</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</LinearGradient>
	);
}
