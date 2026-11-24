import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, formatMoney, formatDate } from '../utils/theme';
import { useApp } from '../context/TransactionContext';

export default function TransactionItem({ item, onDelete }) {
  const { currency } = useApp();
  const isIncome = item.type === 'Income';
  const color = isIncome ? colors.income : colors.expense;
  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: color + '22' }]}>
        <Ionicons name={isIncome ? 'arrow-down' : 'arrow-up'} size={18} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.sub}>{item.category} • {formatDate(item.date)}</Text>
      </View>
      <Text style={[styles.amount, { color }]}>
        {isIncome ? '+' : '-'}{formatMoney(item.amount, currency.symbol)}
      </Text>
      {onDelete && (
        <TouchableOpacity onPress={() => onDelete(item)} style={{ marginLeft: 10 }}>
          <Ionicons name="trash-outline" size={20} color={colors.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: 12, borderRadius: 12, marginBottom: 10 },
  icon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  title: { fontSize: 15, fontWeight: '600', color: colors.text },
  sub: { fontSize: 12, color: colors.muted, marginTop: 2 },
  amount: { fontSize: 15, fontWeight: '700' },
});
