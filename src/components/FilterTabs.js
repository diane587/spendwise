import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

export default function FilterTabs({ options, value, onChange }) {
  return (
    <View style={styles.row}>
      {options.map((o) => (
        <TouchableOpacity key={o} onPress={() => onChange(o)}
          style={[styles.tab, value === o && styles.active]}>
          <Text style={[styles.text, value === o && { color: '#fff' }]}>{o}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  tab: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  active: { backgroundColor: colors.primary, borderColor: colors.primary },
  text: { color: colors.text, fontWeight: '600' },
});
