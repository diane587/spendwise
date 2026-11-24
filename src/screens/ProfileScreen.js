import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/TransactionContext';
import AppButton from '../components/AppButton';
import { colors, currencies } from '../utils/theme';

export default function ProfileScreen() {
  const { userName, setUserName, currency, setCurrency, transactions, clearAll } = useApp();

  const confirmClear = () =>
    Alert.alert('Clear all data', 'This will delete every transaction. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearAll },
    ]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{(userName[0] || '?').toUpperCase()}</Text>
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={userName} onChangeText={setUserName} />

      <Text style={styles.label}>Currency</Text>
      <View style={styles.chips}>
        {currencies.map((c) => (
          <TouchableOpacity key={c.code} onPress={() => setCurrency(c)}
            style={[styles.chip, currency.code === c.code && styles.chipActive]}>
            <Text style={{ color: currency.code === c.code ? '#fff' : colors.text }}>{c.symbol} {c.code}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Settings</Text>
      <Text style={styles.info}>Total transactions: {transactions.length}</Text>
      <AppButton title="Clear All Data" variant="danger" onPress={confirmClear} style={{ marginTop: 12 }} />
      <Text style={styles.version}>SpendWise v1.0.0</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginVertical: 16 },
  avatarText: { color: '#fff', fontSize: 34, fontWeight: '700' },
  label: { fontWeight: '600', color: colors.text, marginTop: 18, marginBottom: 6 },
  input: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, fontSize: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  info: { color: colors.muted },
  version: { textAlign: 'center', color: colors.muted, marginTop: 30 },
});
