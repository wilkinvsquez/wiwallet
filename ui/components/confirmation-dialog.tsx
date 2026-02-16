import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Border } from "@/constants/theme";

interface ConfirmationDialogProps {
	visible: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
	type?: "danger" | "warning" | "info";
}

export default function ConfirmationDialog({
	visible,
	title,
	message,
	confirmText = "Confirmar",
	cancelText = "Cancelar",
	onConfirm,
	onCancel,
	type = "danger",
}: ConfirmationDialogProps) {
	const iconName =
		type === "danger"
			? "trash"
			: type === "warning"
				? "warning"
				: "information-circle";
	const iconColor =
		type === "danger"
			? Colors.semantic.error
			: type === "warning"
				? "#f59e0b"
				: Colors.primary.emerald;

	return (
		<Modal
			visible={visible}
			transparent
			animationType='fade'
			onRequestClose={onCancel}>
			<View style={styles.overlay}>
				<TouchableOpacity
					style={styles.backdrop}
					activeOpacity={1}
					onPress={onCancel}
				/>
				<View style={styles.dialog}>
					{/* Icon */}
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: `${iconColor}15` },
						]}>
						<Ionicons name={iconName} size={40} color={iconColor} />
					</View>

					{/* Title */}
					<Text style={styles.title}>{title}</Text>

					{/* Message */}
					<Text style={styles.message}>{message}</Text>

					{/* Buttons */}
					<View style={styles.buttons}>
						<TouchableOpacity
							onPress={onCancel}
							style={[styles.button, styles.cancelButton]}
							activeOpacity={0.8}>
							<Text style={styles.cancelText}>{cancelText}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={onConfirm}
							activeOpacity={0.8}
							style={styles.button}>
							<LinearGradient
								colors={
									type === "danger"
										? [Colors.semantic.error, "#dc2626"]
										: [
												Colors.primary.emerald,
												Colors.primary.forest,
											]
								}
								style={styles.confirmButton}>
								<Text style={styles.confirmText}>
									{confirmText}
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: Spacing.xl,
	},
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	dialog: {
		backgroundColor: "white",
		borderRadius: Border.radius.xxl,
		padding: Spacing.xxl,
		width: "100%",
		maxWidth: 400,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.25,
		shadowRadius: 25,
		elevation: 20,
		alignItems: "center",
	},
	iconContainer: {
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: Spacing.lg,
	},
	title: {
		fontSize: 22,
		fontWeight: "800",
		color: Colors.neutral.slate800,
		marginBottom: Spacing.sm,
		textAlign: "center",
	},
	message: {
		fontSize: 16,
		color: Colors.neutral.slate600,
		textAlign: "center",
		lineHeight: 24,
		marginBottom: Spacing.xl,
	},
	buttons: {
		flexDirection: "row",
		gap: Spacing.md,
		width: "100%",
	},
	button: {
		flex: 1,
	},
	cancelButton: {
		backgroundColor: Colors.neutral.slate100,
		paddingVertical: 14,
		borderRadius: Border.radius.lg,
		alignItems: "center",
	},
	cancelText: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.neutral.slate600,
	},
	confirmButton: {
		paddingVertical: 14,
		borderRadius: Border.radius.lg,
		alignItems: "center",
	},
	confirmText: {
		fontSize: 16,
		fontWeight: "700",
		color: "white",
	},
});
