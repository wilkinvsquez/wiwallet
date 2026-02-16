import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Border } from "@/constants/theme";
import { useAuth } from "@/context/auth.context";

export default function Dashboard() {
	const { signOut } = useAuth();

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* Header Section */}
				<View style={styles.header}>
					<View>
						<Text style={styles.greeting}>Hola de nuevo 🌿</Text>
						<Text style={styles.title}>Tu resumen de hoy</Text>
					</View>
					<TouchableOpacity
						onPress={signOut}
						style={styles.logoutBtn}>
						<Text style={styles.logoutText}>Salir</Text>
					</TouchableOpacity>
				</View>

				{/* Balance Card */}
				<LinearGradient
					colors={[Colors.primary.forest, "#065f46"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					style={styles.balanceCard}>
					<Text style={styles.balanceLabel}>Balance Total</Text>
					<Text style={styles.balanceAmount}>$12,450.00</Text>
					<View style={styles.balanceBadge}>
						<Text style={styles.badgeText}>+ 2.5% este mes</Text>
					</View>
				</LinearGradient>

				{/* Quick Actions */}
				<Text style={styles.sectionTitle}>Acciones rápidas</Text>
				<View style={styles.actionsGrid}>
					<ActionItem icon='➕' label='Ingreso' />
					<ActionItem icon='💸' label='Gasto' />
					<ActionItem icon='📊' label='Reportes' />
					<ActionItem icon='🎯' label='Metas' />
				</View>

				{/* Recent Activity Placeholder */}
				<Text style={styles.sectionTitle}>Actividad reciente</Text>
				<View style={styles.emptyState}>
					<Text style={styles.emptyText}>
						Todo en orden por aquí.
					</Text>
					<Text style={styles.emptySubtext}>
						Tus transacciones aparecerán aquí pronto.
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

function ActionItem({ icon, label }: { icon: string; label: string }) {
	return (
		<TouchableOpacity style={styles.actionItem}>
			<View style={styles.actionIcon}>
				<Text style={{ fontSize: 24 }}>{icon}</Text>
			</View>
			<Text style={styles.actionLabel}>{label}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.accent.cream,
	},
	scrollContent: {
		padding: Spacing.lg,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: Spacing.xl,
		marginTop: Spacing.md,
	},
	greeting: {
		fontSize: 14,
		color: Colors.neutral.slate500,
		fontWeight: "500",
	},
	title: {
		fontSize: 24,
		fontWeight: "800",
		color: Colors.neutral.slate900,
	},
	logoutBtn: {
		padding: Spacing.sm,
	},
	logoutText: {
		color: Colors.semantic.error,
		fontWeight: "600",
	},
	balanceCard: {
		borderRadius: Border.radius.xl,
		padding: Spacing.xl,
		marginBottom: Spacing.xxl,
		shadowColor: Colors.primary.forest,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.2,
		shadowRadius: 15,
		elevation: 8,
	},
	balanceLabel: {
		color: Colors.primary.mint,
		fontSize: 14,
		fontWeight: "600",
		opacity: 0.9,
	},
	balanceAmount: {
		color: Colors.neutral.white,
		fontSize: 36,
		fontWeight: "800",
		marginVertical: Spacing.xs,
	},
	balanceBadge: {
		backgroundColor: "rgba(255,255,255,0.2)",
		alignSelf: "flex-start",
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 12,
		marginTop: Spacing.sm,
	},
	badgeText: {
		color: Colors.neutral.white,
		fontSize: 12,
		fontWeight: "600",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.neutral.slate800,
		marginBottom: Spacing.lg,
	},
	actionsGrid: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: Spacing.xxl,
	},
	actionItem: {
		alignItems: "center",
		width: "22%",
	},
	actionIcon: {
		width: 55,
		height: 55,
		borderRadius: 18,
		backgroundColor: Colors.accent.beige,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: Spacing.xs,
		borderWidth: 1,
		borderColor: Colors.accent.sand,
	},
	actionLabel: {
		fontSize: 12,
		color: Colors.neutral.slate600,
		fontWeight: "600",
	},
	emptyState: {
		backgroundColor: Colors.neutral.white,
		padding: Spacing.xxl,
		borderRadius: Border.radius.lg,
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.accent.sand,
		borderStyle: "dashed",
	},
	emptyText: {
		fontSize: 16,
		fontWeight: "600",
		color: Colors.neutral.slate800,
	},
	emptySubtext: {
		fontSize: 14,
		color: Colors.neutral.slate500,
		marginTop: 4,
	},
});
