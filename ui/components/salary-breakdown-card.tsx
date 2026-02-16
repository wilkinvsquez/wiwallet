import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Border } from "@/constants/theme";
import api from "@/services/api.service";

export default function SalaryBreakdownCard() {
	const [breakdown, setBreakdown] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		loadBreakdown();
	}, []);

	async function loadBreakdown() {
		try {
			const response = await api.get("/users/salary-breakdown");
			setBreakdown(response.data);
		} catch (error) {
			console.error("Error loading salary breakdown:", error);
		} finally {
			setLoading(false);
		}
	}

	if (loading) {
		return (
			<View style={styles.card}>
				<ActivityIndicator color={Colors.primary.emerald} />
			</View>
		);
	}

	if (!breakdown || breakdown.grossSalary === 0) {
		return null;
	}

	// Calcular valores quincenales
	const biweekly = {
		gross: breakdown.grossSalary / 2,
		ccss: breakdown.ccss / 2,
		incomeTax: breakdown.incomeTax / 2,
		net: breakdown.netSalary / 2,
	};

	return (
		<View style={styles.card}>
			<TouchableOpacity
				onPress={() => setExpanded(!expanded)}
				activeOpacity={0.7}
				style={styles.header}>
				<View style={styles.headerLeft}>
					<Ionicons
						name='wallet'
						size={24}
						color={Colors.primary.emerald}
					/>
					<Text style={styles.title}>Tu Salario</Text>
				</View>
				<Ionicons
					name={expanded ? "chevron-up" : "chevron-down"}
					size={24}
					color={Colors.neutral.slate400}
				/>
			</TouchableOpacity>

			{expanded && (
				<View style={styles.breakdown}>
					<View style={styles.row}>
						<Text style={styles.label}>Salario Bruto</Text>
						<Text style={styles.value}>
							₡{breakdown.grossSalary.toLocaleString()}
						</Text>
					</View>

					<View style={styles.row}>
						<Text style={[styles.label, styles.deduction]}>
							CCSS (10.83%)
						</Text>
						<Text style={[styles.value, styles.deduction]}>
							-₡{Math.round(breakdown.ccss).toLocaleString()}
						</Text>
					</View>

					<View style={styles.row}>
						<Text style={[styles.label, styles.deduction]}>
							Impuesto de Renta
						</Text>
						<Text style={[styles.value, styles.deduction]}>
							-₡{Math.round(breakdown.incomeTax).toLocaleString()}
						</Text>
					</View>

					<View style={styles.divider} />

					<View style={styles.row}>
						<Text style={styles.labelBold}>
							Salario Neto Mensual
						</Text>
						<Text style={styles.valueBold}>
							₡{Math.round(breakdown.netSalary).toLocaleString()}
						</Text>
					</View>

					<View style={styles.row}>
						<Text style={styles.label}>Salario Neto Quincenal</Text>
						<Text style={styles.valueHighlight}>
							₡{Math.round(biweekly.net).toLocaleString()}
						</Text>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		marginHorizontal: Spacing.xl,
		padding: Spacing.lg,
		borderRadius: Border.radius.xl,
		marginBottom: Spacing.xl,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 5,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: Spacing.sm,
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.neutral.slate800,
	},
	breakdown: {
		marginTop: Spacing.md,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "700",
		color: Colors.primary.forest,
		marginBottom: Spacing.xs,
		marginTop: Spacing.xs,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: Spacing.sm,
	},
	label: {
		fontSize: 14,
		color: Colors.neutral.slate600,
	},
	value: {
		fontSize: 14,
		fontWeight: "600",
		color: Colors.neutral.slate800,
	},
	deduction: {
		color: Colors.semantic.error,
	},
	labelBold: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.neutral.slate800,
	},
	valueBold: {
		fontSize: 18,
		fontWeight: "800",
		color: Colors.primary.forest,
	},
	divider: {
		height: 1,
		backgroundColor: Colors.neutral.slate200,
		marginVertical: Spacing.xs,
	},
	spacer: {
		height: Spacing.md,
	},
	valueHighlight: {
		fontSize: 16,
		fontWeight: "700",
		color: Colors.primary.emerald,
	},
});
