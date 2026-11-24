import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '../context/TransactionContext';
import AppButton from '../components/AppButton';
import FilterTabs from '../components/FilterTabs';
import { validateTransaction } from '../utils/validation';
import { colors, categories, formatDate } from '../utils/theme';

export default function AddTransactionScreen({ navigation }) {
  const { addTransaction } = useApp();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [errors, setErrors] = useState({});

  const changeType = (t) => { setType(t); setCategory(''); };

  const save = () => {
    const errs = validateTransaction({ title, amount, type, category, date });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    addTransaction({
      id: Date.now().toString(),
      title: title.trim(),
      amount: parseFloat(amount),
      type, category,
      date: date.toISOString(),
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Groceries" />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="0.00" keyboardType="decimal-pad" />
      {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

      <Text style={styles.label}>Type</Text>
      <FilterTabs options={['Expense', 'Income']} value={type} onChange={changeType} />

      <Text style={styles.label}>Category</Text>
      <View style={styles.chips}>
        {categories[type].map((c) => (
          <TouchableOpacity key={c} onPress={() => setCategory(c)}
            style={[styles.chip, category === c && styles.chipActive]}>
            <Text style={{ color: category === c ? '#fff' : colors.text }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.category && <Text style={styles.error}>{errors.category}</Text>}

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text>{formatDate(date.toISOString())}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date} mode="date" maximumDate={new Date()}
          onChange={(e, d) => {
            if (Platform.OS === 'android') setShowPicker(false);
            if (d) setDate(d);
          }}
        />
      )}

      <AppButton title="Save Transaction" onPress={save} style={{ marginTop: 24 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  label: { fontWeight: '600', color: colors.text, marginTop: 14, marginBottom: 6 },
  input: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, fontSize: 16 },
  error: { color: colors.expense, marginTop: 4, fontSize: 13 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
});
