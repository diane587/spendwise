import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/TransactionContext';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';
import AppButton from '../components/AppButton';
import { colors, formatMoney } from '../utils/theme';

export default function DashboardScreen({ navigation }) {
  const { transactions, balance, income, expenses, currency, userName } = useApp();
  const s = currency.symbol;
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const header = (
    <View>
      <Text style={styles.hello}>Hello, {userName} 👋</Text>
      <View style={styles.balance}>
        <Text style={styles.balLabel}>Total Balance</Text>
        <Text style={styles.balValue}>{formatMoney(balance, s)}</Text>
      </View>
      <View style={styles.row}>
        <SummaryCard label="Income" value={formatMoney(income, s)} color={colors.income} />
        <View style={{ width: 12 }} />
        <SummaryCard label="Expenses" value={formatMoney(expenses, s)} color={colors.expense} />
      </View>
      <Text style={styles.section}>Recent Transactions</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={recent}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        ListHeaderComponent={header}
        ListEmptyComponent={<Text style={styles.empty}>No transactions yet. Add your first one!</Text>}
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={styles.footer}>
        <AppButton title="+ Add Transaction" onPress={() => navigation.navigate('AddTransaction')} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hello: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 14 },
  balance: { backgroundColor: colors.primary, padding: 22, borderRadius: 16, marginBottom: 12 },
  balLabel: { color: '#E0E7FF', fontSize: 14 },
  balValue: { color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 6 },
  row: { flexDirection: 'row' },
  section: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 22, marginBottom: 10 },
  empty: { textAlign: 'center', color: colors.muted, marginTop: 20 },
  footer: { padding: 16, paddingTop: 0 },
});
