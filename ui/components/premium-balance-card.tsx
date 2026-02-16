import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Border } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface PremiumBalanceCardProps {
	balance: {
		monthly: { income: number; expenses: number; balance: number };
		quincenal: { income: number; expenses: number; balance: number };
	};
	netSalary: number;
	viewMode: "monthly" | "quincenal";
	onViewModeChange: (mode: "monthly" | "quincenal") => void;
}

export default function PremiumBalanceCard({
	balance,
	netSalary,
	viewMode,
	onViewModeChange,
}: PremiumBalanceCardProps) {
	// Period Dates and Logic
	const periodInfo = useMemo(() => {
		const now = new Date();
		const day = now.getDate();
		const month = now.toLocaleString("es-ES", { month: "short" });
		const lastDay = new Date(
			now.getFullYear(),
			now.getMonth() + 1,
			0,
		).getDate();

		if (viewMode === "monthly") {
			return {
				range: `01 ${month} - ${lastDay} ${month}`,
				remainingDays: Math.max(lastDay - day + 1, 1),
				income: netSalary,
				// Literal expenses for monthly view
				expenses: balance.monthly.expenses,
			};
		} else {
			// Quincenal View
			const isFirstQ = day <= 15;
			const endDay = isFirstQ ? 15 : lastDay;
			const income = netSalary / 2;

			// APARTADO LOGIC: Instead of actual period expenses,
			// we show HALF of the total monthly expenses.
			const expenses = balance.monthly.expenses / 2;

			return {
				range: isFirstQ
					? `01 ${month} - 15 ${month}`
					: `16 ${month} - ${lastDay} ${month}`,
				remainingDays: Math.max(endDay - day + 1, 1),
				income: income,
				expenses: expenses,
			};
		}
	}, [viewMode, netSalary, balance.monthly.expenses]);

	// Calculate spending progress based on the current view's context
	const spendingProgress = useMemo(() => {
		if (!periodInfo.income || periodInfo.income === 0) return 0;
		return Math.min(periodInfo.expenses / periodInfo.income, 1);
	}, [periodInfo.expenses, periodInfo.income]);

	// Calculate daily budget for the remaining days of the period
	const remainingDaily = useMemo(() => {
		const remainingBudget = Math.max(
			periodInfo.income - periodInfo.expenses,
			0,
		);
		return Math.round(remainingBudget / periodInfo.remainingDays);
	}, [periodInfo.income, periodInfo.expenses, periodInfo.remainingDays]);

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={[Colors.primary.forest, Colors.primary.emerald]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={styles.card}>
				{/* Toggle Switch */}
				<View style={styles.toggleContainer}>
					<TouchableOpacity
						onPress={() => onViewModeChange("quincenal")}
						style={[
							styles.toggleBtn,
							viewMode === "quincenal" && styles.toggleBtnActive,
						]}>
						<Text
							style={[
								styles.toggleText,
								viewMode === "quincenal" &&
									styles.toggleTextActive,
							]}>
							Quincena
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onViewModeChange("monthly")}
						style={[
							styles.toggleBtn,
							viewMode === "monthly" && styles.toggleBtnActive,
						]}>
						<Text
							style={[
								styles.toggleText,
								viewMode === "monthly" &&
									styles.toggleTextActive,
							]}>
							Mes
						</Text>
					</TouchableOpacity>
				</View>

				{/* Top Section: Period Summary */}
				<View style={styles.topSection}>
					<View>
						<View style={styles.periodBadge}>
							<Text style={styles.periodText}>
								{periodInfo.range}
							</Text>
						</View>
						<Text style={styles.label}>
							{viewMode === "monthly"
								? "Balance Mensual"
								: "Balance Quincenal (Apartado)"}
						</Text>
						<Text style={styles.mainBalance}>
							₡
							{Math.round(
								periodInfo.income - periodInfo.expenses,
							).toLocaleString()}
						</Text>
					</View>
					{viewMode === "quincenal" && (
						<View style={styles.infoIcon}>
							<Ionicons
								name='information-circle-outline'
								size={18}
								color='rgba(255,255,255,0.6)'
							/>
						</View>
					)}
				</View>

				{/* Progress Bar Section */}
				<View style={styles.progressContainer}>
					<View style={styles.progressHeader}>
						<Text style={styles.progressLabel}>
							{viewMode === "monthly"
								? "Gastos del Mes"
								: "Proporción de Gastos"}
						</Text>
						<Text style={styles.progressPercentage}>
							{Math.round(spendingProgress * 100)}%
						</Text>
					</View>
					<View style={styles.progressBarBg}>
						<View
							style={[
								styles.progressBarFill,
								{
									width: `${spendingProgress * 100}%`,
									backgroundColor: "white",
								},
							]}
						/>
					</View>
				</View>

				{/* Stats Grid */}
				<View style={styles.statsGrid}>
					<View style={styles.statItem}>
						<Text style={styles.statLabel}>Meta Periodo</Text>
						<Text style={styles.statValue}>
							₡{Math.round(periodInfo.income).toLocaleString()}
						</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statItem}>
						<Text style={styles.statLabel}>Gastado Total</Text>
						<Text style={styles.statValue}>
							₡
							{Math.round(
								balance.monthly.expenses,
							).toLocaleString()}
						</Text>
					</View>
					<View style={styles.statDivider} />
					<View style={styles.statItem}>
						<Text style={styles.statLabel}>Disponible hoy</Text>
						<Text
							style={[
								styles.statValue,
								{ color: Colors.accent.mint },
							]}>
							₡{remainingDaily.toLocaleString()}
						</Text>
					</View>
				</View>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: Spacing.xl,
		marginBottom: Spacing.xl,
	},
	card: {
		borderRadius: Border.radius.xxl,
		padding: Spacing.xl,
		shadowColor: Colors.primary.forest,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.3,
		shadowRadius: 15,
		elevation: 10,
	},
	toggleContainer: {
		flexDirection: "row",
		backgroundColor: "rgba(0,0,0,0.15)",
		borderRadius: 12,
		padding: 4,
		alignSelf: "flex-start",
		marginBottom: Spacing.xl,
	},
	toggleBtn: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
	},
	toggleBtnActive: {
		backgroundColor: "rgba(255,255,255,0.2)",
	},
	toggleText: {
		color: "rgba(255,255,255,0.6)",
		fontSize: 12,
		fontWeight: "700",
	},
	toggleTextActive: {
		color: "white",
	},
	topSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: Spacing.lg,
	},
	periodBadge: {
		backgroundColor: "rgba(255,255,255,0.2)",
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 6,
		alignSelf: "flex-start",
		marginBottom: 8,
	},
	periodText: {
		color: "white",
		fontSize: 10,
		fontWeight: "700",
		textTransform: "uppercase",
	},
	label: {
		color: "rgba(255,255,255,0.8)",
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 4,
	},
	mainBalance: {
		color: "white",
		fontSize: 32,
		fontWeight: "800",
	},
	infoIcon: {
		padding: 4,
	},
	progressContainer: {
		marginBottom: Spacing.xl,
	},
	progressHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	progressLabel: {
		color: "rgba(255,255,255,0.9)",
		fontSize: 12,
		fontWeight: "600",
	},
	progressPercentage: {
		color: "white",
		fontSize: 12,
		fontWeight: "700",
	},
	progressBarBg: {
		height: 8,
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: 4,
		overflow: "hidden",
	},
	progressBarFill: {
		height: "100%",
		borderRadius: 4,
	},
	statsGrid: {
		flexDirection: "row",
		backgroundColor: "rgba(255,255,255,0.15)",
		borderRadius: Border.radius.lg,
		padding: Spacing.md,
		alignItems: "center",
		justifyContent: "space-between",
	},
	statItem: {
		alignItems: "center",
		flex: 1,
	},
	statDivider: {
		width: 1,
		height: 24,
		backgroundColor: "rgba(255,255,255,0.2)",
	},
	statLabel: {
		color: "rgba(255,255,255,0.7)",
		fontSize: 10,
		fontWeight: "600",
		marginBottom: 2,
	},
	statValue: {
		color: "white",
		fontSize: 13,
		fontWeight: "700",
	},
});
