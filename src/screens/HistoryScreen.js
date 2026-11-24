import React, { useState } from 'react';
import { Text, FlatList, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/TransactionContext';
import TransactionItem from '../components/TransactionItem';
import FilterTabs from '../components/FilterTabs';
import { colors } from '../utils/theme';

export default function HistoryScreen() {
  const { transactions, deleteTransaction } = useApp();
  const [filter, setFilter] = useState('All');

  const data = transactions
    .filter((t) => filter === 'All' || t.type === filter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const confirmDelete = (item) =>
    Alert.alert('Delete transaction', `Delete "${item.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTransaction(item.id) },
    ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.heading}>Transaction History</Text>
      <FilterTabs options={['All', 'Income', 'Expense']} value={filter} onChange={setFilter} />
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <TransactionItem item={item} onDelete={confirmDelete} />}
        ListEmptyComponent={<Text style={styles.empty}>No transactions found.</Text>}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 12 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 30 },
});
