import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { colors } from '../utils/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.logo}>💰</Text>
        <Text style={styles.name}>SpendWise</Text>
        <Text style={styles.desc}>
          Track your income and expenses, watch your balance, and understand where your money goes.
        </Text>
      </View>
      <AppButton title="Get Started" onPress={() => navigation.replace('Main')} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 80 },
  name: { fontSize: 36, fontWeight: '800', color: colors.primary, marginTop: 8 },
  desc: { textAlign: 'center', color: colors.muted, fontSize: 16, marginTop: 12, lineHeight: 23 },
});
