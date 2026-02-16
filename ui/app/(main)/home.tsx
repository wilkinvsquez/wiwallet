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
import SalaryBreakdownCard from "@/components/salary-breakdown-card";
import PremiumBalanceCard from "@/components/premium-balance-card";
import { useAlert } from "@/context/alert.context";
import ConfirmationDialog from "@/components/confirmation-dialog";

export default function Home() {
	const { user, signOut } = useAuth();
	const { showAlert } = useAlert();
	const [balance, setBalance] = useState({
		monthly: { income: 0, expenses: 0, balance: 0 },
		quincenal: { income: 0, expenses: 0, balance: 0 },
	});
	const [viewMode, setViewMode] = useState<"monthly" | "quincenal">(
		"quincenal",
	);
	const [netSalary, setNetSalary] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
	const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
	const [transactionToDelete, setTransactionToDelete] = useState<
		string | null
	>(null);

	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		try {
			setLoading(true);
			const [balanceRes, transactionsRes, salaryRes] = await Promise.all([
				api.get("/transactions/balance"),
				api.get("/transactions"),
				api.get("/users/salary-breakdown"),
			]);

			setBalance(
				balanceRes.data || {
					monthly: { income: 0, expenses: 0, balance: 0 },
					quincenal: { income: 0, expenses: 0, balance: 0 },
				},
			);
			setTransactions((transactionsRes.data || []).slice(0, 5));
			setNetSalary(salaryRes.data?.netSalary || 0);
		} catch (error) {
			console.error("Error loading data:", error);
			setBalance({
				monthly: { income: 0, expenses: 0, balance: 0 },
				quincenal: { income: 0, expenses: 0, balance: 0 },
			});
			setTransactions([]);
		} finally {
			setLoading(false);
		}
	}

	function handleDeleteTransaction(transactionId: string) {
		setTransactionToDelete(transactionId);
		setDeleteDialogVisible(true);
	}

	async function confirmDelete() {
		if (!transactionToDelete) return;

		try {
			await api.delete(`/transactions/${transactionToDelete}`);
			showAlert("Transacción eliminada", "success");
			loadData();
		} catch (error: any) {
			showAlert(error, "error");
		} finally {
			setDeleteDialogVisible(false);
			setTransactionToDelete(null);
		}
	}

	function handleEditTransaction(transaction: any) {
		setSelectedTransaction(transaction);
		setModalVisible(true);
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
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.header}>
						<Text style={styles.greeting}>
							👋 Hola, {user?.name || "Usuario"}
						</Text>
						<TouchableOpacity
							onPress={signOut}
							style={styles.logoutBtn}>
							<Ionicons
								name='log-out-outline'
								size={24}
								color={Colors.semantic.error}
							/>
						</TouchableOpacity>
					</View>

					<SalaryBreakdownCard />

					<PremiumBalanceCard
						balance={balance}
						netSalary={netSalary}
						viewMode={viewMode}
						onViewModeChange={setViewMode}
					/>
				</ScrollView>

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

								{/* Botones de acción */}
								<View style={styles.transactionActions}>
									<TouchableOpacity
										onPress={() =>
											handleEditTransaction(transaction)
										}
										style={styles.actionBtn}>
										<Ionicons
											name='pencil'
											size={18}
											color={Colors.primary.emerald}
										/>
									</TouchableOpacity>
									<TouchableOpacity
										onPress={() =>
											handleDeleteTransaction(
												transaction.id,
											)
										}
										style={styles.actionBtn}>
										<Ionicons
											name='trash'
											size={18}
											color={Colors.semantic.error}
										/>
									</TouchableOpacity>
								</View>
							</View>
						))
					)}
				</View>
			</ScrollView>

			{/* Floating Action Button */}
			<TouchableOpacity
				style={styles.fab}
				activeOpacity={0.8}
				onPress={() => setModalVisible(true)}>
				<LinearGradient
					colors={[Colors.primary.emerald, Colors.primary.forest]}
					style={styles.fabGradient}>
					<Ionicons name='add' size={32} color='white' />
				</LinearGradient>
			</TouchableOpacity>
			{/* Transaction Modal */}
			<TransactionModal
				visible={modalVisible}
				onClose={() => {
					setModalVisible(false);
					setSelectedTransaction(null);
				}}
				onSuccess={loadData}
				transaction={selectedTransaction}
			/>

			<ConfirmationDialog
				visible={deleteDialogVisible}
				title='Eliminar transacción'
				message='¿Estás seguro de que deseas eliminar esta transacción? Esta acción no se puede deshacer.'
				confirmText='Eliminar'
				cancelText='Cancelar'
				type='danger'
				onConfirm={confirmDelete}
				onCancel={() => setDeleteDialogVisible(false)}
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	greeting: {
		fontSize: 28,
		fontWeight: "700",
		color: Colors.neutral.slate800,
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
	logoutBtn: {
		padding: 8,
	},

	transactionActions: {
		flexDirection: "row",
		gap: 4,
		marginLeft: Spacing.sm,
	},
	actionBtn: {
		padding: 6,
		borderRadius: 8,
		backgroundColor: Colors.neutral.slate50,
	},
});
