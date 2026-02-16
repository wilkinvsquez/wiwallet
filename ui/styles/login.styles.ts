import { StyleSheet, Platform, Dimensions } from "react-native";
import { Colors, Spacing, Border } from "../constants/theme";

const { width } = Dimensions.get("window");

export const loginStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: Spacing.lg,
	},
	iconContainer: {
		alignItems: "center",
		marginBottom: Spacing.md,
	},
	iconGradient: {
		width: 70,
		height: 70,
		borderRadius: Border.radius.lg,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: Colors.primary.emerald,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 15,
		elevation: 8,
	},
	glassCard: {
		width: Platform.OS === "web" && width > 500 ? 450 : "100%",
		padding: Spacing.xxl,
		borderRadius: Border.radius.xl,
		backgroundColor: Colors.accent.cream,
		shadowColor: Colors.neutral.slate500,
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.1,
		shadowRadius: 30,
		elevation: 10,
		borderWidth: 1,
		borderColor: Colors.accent.sand,
		// Fix for web deprecation
		...Platform.select({
			web: {
				boxShadow: `0px 20px 30px rgba(100, 116, 139, 0.1)`,
			},
		}),
	},
	emoji: {
		fontSize: 32,
		textAlign: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		color: Colors.neutral.slate800,
		textAlign: "center",
		letterSpacing: -0.5,
	},
	subtitle: {
		fontSize: 14,
		color: Colors.neutral.slate500,
		textAlign: "center",
		marginBottom: Spacing.xxl,
		marginTop: Spacing.sm,
		lineHeight: 20,
	},
	inputContainer: {
		marginBottom: Spacing.lg,
	},
	label: {
		color: Colors.neutral.slate600,
		fontSize: 13,
		fontWeight: "600",
		marginBottom: Spacing.sm,
		marginLeft: 4,
	},
	input: {
		backgroundColor: Colors.neutral.slate50,
		borderWidth: 1,
		borderColor: Colors.neutral.slate200,
		borderRadius: Border.radius.lg,
		padding: Spacing.md,
		color: Colors.neutral.slate800,
		fontSize: 16,
	},
	inputError: {
		borderColor: Colors.semantic.error,
		backgroundColor: "#FEF2F2",
	},
	errorText: {
		color: Colors.semantic.error,
		fontSize: 12,
		marginTop: 4,
		marginLeft: 4,
		fontWeight: "500",
	},
	button: {
		borderRadius: Border.radius.lg,
		padding: 18,
		alignItems: "center",
		justifyContent: "center",
		marginTop: Spacing.sm,
		shadowColor: Colors.primary.forest,
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 5,
	},
	buttonText: {
		color: Colors.neutral.white,
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 0.3,
	},
	forgotPass: {
		marginTop: Spacing.xl,
		alignItems: "center",
	},
	forgotPassText: {
		color: Colors.neutral.slate400,
		fontSize: 14,
		fontWeight: "500",
	},
	footer: {
		flexDirection: "row",
		marginTop: Spacing.huge,
	},
	footerText: {
		color: Colors.neutral.slate500,
		fontSize: 15,
	},
	signUpText: {
		color: Colors.primary.forest,
		fontSize: 15,
		fontWeight: "700",
	},
});
