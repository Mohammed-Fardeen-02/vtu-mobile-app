import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Card } from '@/shared/components';
import { colors } from '@/core/theme';

export const CgpaCalculatorScreen: React.FC = () => {
  return (
    <Container style={styles.container}>
      <Text style={styles.title}>CGPA Calculator</Text>
      <Text style={styles.subtitle}>Enter SGPA for all completed semesters</Text>

      <Card style={styles.card}>
        <Text style={styles.info}>Cumulative GPA Formula: Σ(SGPA × Credits) / Σ(Credits)</Text>
      </Card>

      <Button title="Calculate CGPA" onPress={() => {}} style={styles.btn} />
    </Container>
  );
};



export const GpaGoalPlannerScreen: React.FC = () => {
  return (
    <Container style={styles.container}>
      <Text style={styles.title}>GPA Goal Planner</Text>
      <Text style={styles.subtitle}>Find required SGPA in remaining semesters to hit target CGPA</Text>

      <Card style={styles.card}>
        <Text style={styles.info}>Set your target CGPA (e.g. 8.5) and calculate roadmap</Text>
      </Card>

      <Button title="Plan Roadmap" onPress={() => {}} style={styles.btn} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text.darkPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.darkSecondary,
  },
  card: {
    padding: 20,
  },
  info: {
    fontSize: 14,
    color: colors.text.darkPrimary,
  },
  btn: {
    marginTop: 16,
  },
});
