import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

export default function SummaryCard({ label, value, color = colors.text, style }) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, padding: 16, borderRadius: 14, flex: 1, elevation: 2 },
  label: { color: colors.muted, fontSize: 13, marginBottom: 6 },
  value: { fontSize: 20, fontWeight: '700' },
});
