import React, { createContext, useContext, useState, useCallback } from "react";
import {
	Animated,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Border } from "../constants/theme";

type AlertType = "success" | "error" | "info";

/**
 * Interface for the alert context
 */
interface AlertContextData {
	showAlert: (message: string, type?: AlertType) => void;
	hideAlert: () => void;
}

const AlertContext = createContext<AlertContextData>({} as AlertContextData);

/**
 * Method to handle the alert provider
 * @param children React.ReactNode
 * @returns JSX.Element
 */
export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState<AlertType>("info");

	/**
	 * Method to handle the alert
	 * @param msg string
	 * @param alertType AlertType
	 */
	const showAlert = useCallback(
		(msg: string, alertType: AlertType = "info") => {
			setMessage(msg);
			setType(alertType);
			setVisible(true);

			setTimeout(() => {
				setVisible(false);
			}, 4000);
		},
		[],
	);

	/**
	 * Method to hide the alert
	 */
	const hideAlert = useCallback(() => setVisible(false), []);

	return (
		<AlertContext.Provider value={{ showAlert, hideAlert }}>
			{children}
			{visible && (
				<CustomAlert
					message={message}
					type={type}
					onClose={hideAlert}
				/>
			)}
		</AlertContext.Provider>
	);
};

/**
 * Method to handle the custom alert
 * @param message string
 * @param type AlertType
 * @param onClose () => void
 * @returns JSX.Element
 */
const CustomAlert = ({
	message,
	type,
	onClose,
}: {
	message: string;
	type: AlertType;
	onClose: () => void;
}) => {
	const translateY = new Animated.Value(-100);
	const opacity = new Animated.Value(0);

	React.useEffect(() => {
		Animated.parallel([
			Animated.spring(translateY, {
				toValue: 0,
				friction: 8,
				tension: 40,
				useNativeDriver: true,
			}),
			Animated.timing(opacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
		]).start();
	}, []);

	const config = {
		success: {
			icon: "checkmark-circle",
			color: Colors.primary.emerald,
			bg: "#ECFDF5",
		},
		error: {
			icon: "alert-circle",
			color: Colors.semantic.error,
			bg: "#FEF2F2",
		},
		info: {
			icon: "information-circle",
			color: Colors.neutral.slate500,
			bg: "#F8FAFC",
		},
	};

	const { icon, color, bg } = config[type];

	return (
		// Alert wrapper
		<Animated.View
			style={[
				styles.alertWrapper,
				{ transform: [{ translateY }], opacity },
			]}>
			{/* Alert container */}
			<View
				style={[
					styles.container,
					{ backgroundColor: bg, borderColor: color + "33" },
				]}>
				{/* Icon container */}
				<View style={styles.iconContainer}>
					<Ionicons name={icon as any} size={24} color={color} />
				</View>
				{/* Text container */}
				<View style={styles.textContainer}>
					<Text
						style={[
							styles.message,
							{ color: Colors.neutral.slate800 },
						]}>
						{message}
					</Text>
				</View>
				{/* Close button */}
				<TouchableOpacity onPress={onClose} style={styles.closeBtn}>
					<Ionicons
						name='close'
						size={20}
						color={Colors.neutral.slate400}
					/>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

/**
 * Styles for the alert component
 */
const styles = StyleSheet.create({
	alertWrapper: {
		position: "absolute",
		top: 60,
		left: 0,
		right: 0,
		alignItems: "center",
		zIndex: 9999,
		paddingHorizontal: Spacing.xl,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: Spacing.md,
		borderRadius: Border.radius.lg,
		borderWidth: 1,
		width: "100%",
		maxWidth: 400,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 5,
	},
	iconContainer: {
		marginRight: Spacing.sm,
	},
	textContainer: {
		flex: 1,
	},
	message: {
		fontSize: 14,
		fontWeight: "600",
		lineHeight: 20,
	},
	closeBtn: {
		padding: 4,
		marginLeft: Spacing.xs,
	},
});

export const useAlert = () => useContext(AlertContext);
