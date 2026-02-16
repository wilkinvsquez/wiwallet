import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Border } from "@/constants/theme";
import { useAuth } from "@/context/auth.context";
import api from "@/services/api.service";
import TransactionModal from "@/components/transaction-modal";

export default function Home() {
	const { user } = useAuth();
	const [balance, setBalance] = useState({
		income: 0,
		expenses: 0,
		balance: 0,
	});
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		try {
			setLoading(true);
			const [balanceRes, transactionsRes] = await Promise.all([
				api.get("/transactions/balance"),
				api.get("/transactions"),
			]);

			setBalance(
				balanceRes.data || { income: 0, expenses: 0, balance: 0 },
			);
			setTransactions((transactionsRes.data || []).slice(0, 5));
		} catch (error) {
			console.error("Error loading data:", error);
			setBalance({ income: 0, expenses: 0, balance: 0 });
			setTransactions([]);
		} finally {
			setLoading(false);
		}
	}

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator
					size='large'
					color={Colors.primary.emerald}
				/>
			</View>
		);
	}

	return (
		<LinearGradient
			colors={[
				Colors.accent.cream,
				Colors.accent.beige,
				Colors.primary.mint,
			]}
			style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.greeting}>
						👋 Hola, {user?.name || "Usuario"}
					</Text>
				</View>

				{/* Balance Card */}
				<View style={styles.balanceCard}>
					<Text style={styles.balanceLabel}>Balance Actual</Text>
					<Text style={styles.balanceAmount}>
						₡{balance.balance.toLocaleString()}
					</Text>
					<View style={styles.balanceDetails}>
						<View style={styles.balanceItem}>
							<Text style={styles.balanceDetailLabel}>
								Ingresos
							</Text>
							<Text
								style={[
									styles.balanceDetailValue,
									{ color: Colors.primary.emerald },
								]}>
								₡{balance.income.toLocaleString()}
							</Text>
						</View>
						<View style={styles.balanceItem}>
							<Text style={styles.balanceDetailLabel}>
								Gastos
							</Text>
							<Text
								style={[
									styles.balanceDetailValue,
									{ color: Colors.semantic.error },
								]}>
								-₡{balance.expenses.toLocaleString()}
							</Text>
						</View>
					</View>
				</View>

				{/* Recent Transactions */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						📊 Últimas Transacciones
					</Text>
					{transactions.length === 0 ? (
						<View style={styles.emptyState}>
							<Text style={styles.emptyText}>
								No hay transacciones aún
							</Text>
							<Text style={styles.emptySubtext}>
								Toca el botón + para agregar tu primer gasto
							</Text>
						</View>
					) : (
						transactions.map((transaction: any) => (
							<View
								key={transaction.id}
								style={styles.transactionItem}>
								<View style={styles.transactionIcon}>
									<Text style={styles.transactionEmoji}>
										{getCategoryEmoji(transaction.category)}
									</Text>
								</View>
								<View style={styles.transactionInfo}>
									<Text style={styles.transactionCategory}>
										{transaction.category}
									</Text>
									{transaction.description && (
										<Text
											style={
												styles.transactionDescription
											}>
											{transaction.description}
										</Text>
									)}
								</View>
								<Text
									style={[
										styles.transactionAmount,
										{
											color:
												transaction.type === "income"
													? Colors.primary.emerald
													: Colors.semantic.error,
										},
									]}>
									{transaction.type === "income" ? "+" : "-"}₡
									{transaction.amount.toLocaleString()}
								</Text>
							</View>
						))
					)}
				</View>
			</ScrollView>

			{/* Floating Action Button */}
			<TouchableOpacity
				style={styles.fab}
				activeOpacity={0.8}
				onPress={() => setIsModalVisible(true)}>
				<LinearGradient
					colors={[Colors.primary.emerald, Colors.primary.forest]}
					style={styles.fabGradient}>
					<Ionicons name='add' size={32} color='white' />
				</LinearGradient>
			</TouchableOpacity>
			{/* Transaction Modal */}
			<TransactionModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				onSuccess={loadData}
			/>
		</LinearGradient>
	);
}

function getCategoryEmoji(category: string): string {
	const emojis: Record<string, string> = {
		Comida: "🍔",
		Transporte: "🚗",
		Casa: "🏠",
		Salud: "💊",
		Ocio: "🎉",
		Servicios: "📱",
		Compras: "🛒",
		Salario: "💰",
	};
	return emojis[category] || "💵";
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		paddingHorizontal: Spacing.xl,
		marginBottom: Spacing.lg,
	},
	greeting: {
		fontSize: 28,
		fontWeight: "700",
		color: Colors.neutral.slate800,
	},
	balanceCard: {
		backgroundColor: "white",
		marginHorizontal: Spacing.xl,
		padding: Spacing.xl,
		borderRadius: Border.radius.xl,
		marginBottom: Spacing.xl,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 5,
	},
	balanceLabel: {
		fontSize: 14,
		color: Colors.neutral.slate500,
		marginBottom: 8,
	},
	balanceAmount: {
		fontSize: 42,
		fontWeight: "800",
		color: Colors.primary.forest,
		marginBottom: Spacing.md,
	},
	balanceDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: Spacing.md,
		borderTopWidth: 1,
		borderTopColor: Colors.neutral.slate200,
	},
	balanceItem: {
		flex: 1,
	},
	balanceDetailLabel: {
		fontSize: 12,
		color: Colors.neutral.slate500,
		marginBottom: 4,
	},
	balanceDetailValue: {
		fontSize: 18,
		fontWeight: "700",
	},
	section: {
		paddingHorizontal: Spacing.xl,
		marginBottom: Spacing.xl,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: Colors.neutral.slate800,
		marginBottom: Spacing.md,
	},
	emptyState: {
		backgroundColor: "white",
		padding: Spacing.xl,
		borderRadius: Border.radius.lg,
		alignItems: "center",
	},
	emptyText: {
		fontSize: 16,
		fontWeight: "600",
		color: Colors.neutral.slate600,
		marginBottom: 4,
	},
	emptySubtext: {
		fontSize: 14,
		color: Colors.neutral.slate400,
		textAlign: "center",
	},
	transactionItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		padding: Spacing.md,
		borderRadius: Border.radius.lg,
		marginBottom: Spacing.sm,
	},
	transactionIcon: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: Colors.accent.beige,
		justifyContent: "center",
		alignItems: "center",
		marginRight: Spacing.md,
	},
	transactionEmoji: {
		fontSize: 24,
	},
	transactionInfo: {
		flex: 1,
	},
	transactionCategory: {
		fontSize: 16,
		fontWeight: "600",
		color: Colors.neutral.slate800,
	},
	transactionDescription: {
		fontSize: 14,
		color: Colors.neutral.slate500,
		marginTop: 2,
	},
	transactionAmount: {
		fontSize: 18,
		fontWeight: "700",
	},
	fab: {
		position: "absolute",
		bottom: 30,
		right: 30,
		borderRadius: 30,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 12,
		elevation: 8,
	},
	fabGradient: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
	},
});
