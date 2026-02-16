import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Modal,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Border } from "@/constants/theme";
import { useAlert } from "@/context/alert.context";
import api from "@/services/api.service";

interface TransactionModalProps {
	visible: boolean;
	onClose: () => void;
	onSuccess: () => void;
	transaction?: any; // Si existe, estamos editando
}

const CATEGORIES = [
	{ name: "Comida", emoji: "🍔", color: "#f59e0b" },
	{ name: "Transporte", emoji: "🚗", color: "#3b82f6" },
	{ name: "Casa", emoji: "🏠", color: "#8b5cf6" },
	{ name: "Salud", emoji: "💊", color: "#ef4444" },
	{ name: "Ocio", emoji: "🎉", color: "#ec4899" },
	{ name: "Servicios", emoji: "📱", color: "#06b6d4" },
	{ name: "Compras", emoji: "🛒", color: "#10b981" },
];

export default function TransactionModal({
	visible,
	onClose,
	onSuccess,
	transaction,
}: TransactionModalProps) {
	const { showAlert } = useAlert();
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);

	const isEditing = !!transaction;

	useEffect(() => {
		if (transaction) {
			setAmount(transaction.amount.toString());
			setCategory(transaction.category);
			setDescription(transaction.description || "");
		}
	}, [transaction]);

	async function handleSubmit() {
		if (!amount || !category) {
			showAlert("Por favor completa el monto y la categoría", "error");
			return;
		}

		const numAmount = parseFloat(amount);
		if (isNaN(numAmount) || numAmount <= 0) {
			showAlert("Ingresa un monto válido", "error");
			return;
		}

		try {
			setLoading(true);
			const data = {
				amount: numAmount,
				category,
				description: description || undefined,
				type: "expense" as const,
			};

			if (isEditing) {
				await api.put(`/transactions/${transaction.id}`, data);
				showAlert("¡Gasto actualizado!", "success");
			} else {
				await api.post("/transactions", data);
				showAlert("¡Gasto registrado!", "success");
			}

			resetForm();
			onSuccess();
			onClose();
		} catch (error: any) {
			showAlert(error, "error");
		} finally {
			setLoading(false);
		}
	}

	function resetForm() {
		setAmount("");
		setCategory("");
		setDescription("");
	}

	function handleClose() {
		resetForm();
		onClose();
	}

	return (
		<Modal
			visible={visible}
			animationType='slide'
			transparent
			onRequestClose={handleClose}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.overlay}>
				<TouchableOpacity
					style={styles.backdrop}
					activeOpacity={1}
					onPress={handleClose}
				/>
				<View style={styles.modalContainer}>
					{/* Header */}
					<View style={styles.header}>
						<Text style={styles.title}>
							{isEditing ? "Editar Gasto" : "Agregar Gasto"}
						</Text>
						<TouchableOpacity
							onPress={handleClose}
							style={styles.closeBtn}>
							<Ionicons
								name='close'
								size={28}
								color={Colors.neutral.slate600}
							/>
						</TouchableOpacity>
					</View>

					<ScrollView showsVerticalScrollIndicator={false}>
						{/* Amount Input */}
						<View style={styles.section}>
							<Text style={styles.label}>Monto</Text>
							<View style={styles.amountInputContainer}>
								<Text style={styles.currencySymbol}>₡</Text>
								<TextInput
									style={styles.amountInput}
									placeholder='0'
									value={amount}
									onChangeText={setAmount}
									keyboardType='numeric'
									placeholderTextColor={
										Colors.neutral.slate100
									}
								/>
							</View>
						</View>

						{/* Category Selection */}
						<View style={styles.section}>
							<Text style={styles.label}>Categoría</Text>
							<View style={styles.categoriesGrid}>
								{CATEGORIES.map(cat => (
									<TouchableOpacity
										key={cat.name}
										style={[
											styles.categoryItem,
											category === cat.name &&
												styles.categoryItemActive,
										]}
										onPress={() => setCategory(cat.name)}>
										<Text style={styles.categoryEmoji}>
											{cat.emoji}
										</Text>
										<Text
											style={[
												styles.categoryName,
												category === cat.name &&
													styles.categoryNameActive,
											]}>
											{cat.name}
										</Text>
									</TouchableOpacity>
								))}
							</View>
						</View>

						{/* Description Input */}
						<View style={styles.section}>
							<Text style={styles.label}>
								Descripción (opcional)
							</Text>
							<TextInput
								style={styles.descriptionInput}
								placeholder='Ej: Almuerzo con amigos'
								value={description}
								onChangeText={setDescription}
								placeholderTextColor={Colors.neutral.slate400}
								multiline
								numberOfLines={3}
							/>
						</View>

						{/* Submit Button */}
						<TouchableOpacity
							onPress={handleSubmit}
							disabled={loading}
							activeOpacity={0.8}
							style={styles.submitBtn}>
							<LinearGradient
								colors={[
									Colors.primary.emerald,
									Colors.primary.forest,
								]}
								style={styles.submitGradient}>
								<Text style={styles.submitText}>
									{loading
										? "Guardando..."
										: isEditing
											? "Actualizar Gasto"
											: "Guardar Gasto"}
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}
const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center", // Centrado en web
		alignItems: "center", // Centrado en web
		paddingHorizontal: Spacing.xl,
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContainer: {
		backgroundColor: "white",
		borderRadius: Border.radius.xxl,
		paddingTop: Spacing.lg,
		paddingHorizontal: Spacing.xl,
		paddingBottom: Spacing.xxl,
		maxHeight: "90%",
		width: "100%",
		maxWidth: 500, // Límite de ancho para web
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.25,
		shadowRadius: 25,
		elevation: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: Spacing.xl,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		color: Colors.neutral.slate800,
	},
	closeBtn: {
		padding: 4,
	},
	section: {
		marginBottom: Spacing.xl,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		color: Colors.neutral.slate100,
		marginBottom: Spacing.sm,
	},
	amountInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.neutral.slate50,
		borderWidth: 2,
		borderColor: Colors.neutral.slate200,
		borderRadius: Border.radius.lg,
		paddingHorizontal: Spacing.md,
	},
	currencySymbol: {
		fontSize: 32,
		fontWeight: "700",
		color: Colors.primary.forest,
		marginRight: Spacing.sm,
	},
	amountInput: {
		flex: 1,
		fontSize: 32,
		fontWeight: "700",
		color: Colors.neutral.slate800,
		paddingVertical: Spacing.md,
	},
	categoriesGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: Spacing.sm,
	},
	categoryItem: {
		width: "30%",
		aspectRatio: 1,
		backgroundColor: Colors.neutral.slate50,
		borderRadius: Border.radius.lg,
		borderWidth: 2,
		borderColor: Colors.neutral.slate200,
		justifyContent: "center",
		alignItems: "center",
		padding: Spacing.sm,
	},
	categoryItemActive: {
		backgroundColor: Colors.primary.mint,
		borderColor: Colors.primary.emerald,
	},
	categoryEmoji: {
		fontSize: 32,
		marginBottom: 4,
	},
	categoryName: {
		fontSize: 12,
		fontWeight: "600",
		color: Colors.neutral.slate600,
		textAlign: "center",
	},
	categoryNameActive: {
		color: Colors.primary.forest,
	},
	descriptionInput: {
		backgroundColor: Colors.neutral.slate50,
		borderWidth: 1,
		borderColor: Colors.neutral.slate200,
		borderRadius: Border.radius.lg,
		padding: Spacing.md,
		fontSize: 16,
		color: Colors.neutral.slate800,
		textAlignVertical: "top",
	},
	submitBtn: {
		marginTop: Spacing.md,
	},
	submitGradient: {
		padding: 18,
		borderRadius: Border.radius.lg,
		alignItems: "center",
	},
	submitText: {
		color: "white",
		fontSize: 18,
		fontWeight: "700",
	},
});
