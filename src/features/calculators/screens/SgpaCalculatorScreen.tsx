import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Container, Button, Card } from '@/shared/components';
import { colors } from '@/core/theme';

export const SgpaCalculatorScreen: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    setResult(8.65);
  };

  return (
    <Container safe={false} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>SGPA Calculator</Text>
        <Text style={styles.subtitle}>Enter marks & credits according to your VTU scheme</Text>

        <Card style={styles.card}>
          <Text style={styles.label}>Subject 1: Engineering Mathematics (4 Credits)</Text>
          <TextInput
            style={styles.input}
            placeholder="Grade (e.g. O, A+, A, B+)"
            placeholderTextColor={colors.text.darkSecondary}
          />

          <Text style={styles.label}>Subject 2: Data Structures (4 Credits)</Text>
          <TextInput
            style={styles.input}
            placeholder="Grade"
            placeholderTextColor={colors.text.darkSecondary}
          />
        </Card>

        <Button title="Calculate SGPA" onPress={handleCalculate} style={styles.calcBtn} />

        {result !== null && (
          <Card style={styles.resultCard}>
            <Text style={styles.resultLabel}>Calculated SGPA</Text>
            <Text style={styles.resultValue}>{result.toFixed(2)}</Text>
            <Text style={styles.resultPercentage}>Equivalent Percentage: {((result - 0.75) * 10).toFixed(2)}%</Text>
          </Card>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text.darkPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.darkSecondary,
    marginBottom: 20,
  },
  card: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.darkPrimary,
  },
  input: {
    backgroundColor: colors.background.dark,
    borderColor: colors.background.darkCardBorder,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    color: colors.text.darkPrimary,
    marginBottom: 8,
  },
  calcBtn: {
    marginTop: 20,
  },
  resultCard: {
    marginTop: 24,
    alignItems: 'center',
    padding: 24,
    borderColor: colors.primary[500],
  },
  resultLabel: {
    fontSize: 14,
    color: colors.text.darkSecondary,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.primary[400],
    marginVertical: 8,
  },
  resultPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent[500],
  },
});
