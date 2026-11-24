import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../utils/theme';

export default function AppButton({ title, onPress, variant = 'primary', style }) {
  const outline = variant === 'outline';
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.btn, outline && styles.outline, variant === 'danger' && styles.danger, style]}
    >
      <Text style={[styles.text, outline && { color: colors.primary }]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary },
  danger: { backgroundColor: colors.expense },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
