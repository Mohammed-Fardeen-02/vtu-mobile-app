import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Button } from '@/shared/components';
import { colors } from '@/core/theme';

export const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>VTU</Text>
        </View>
        <Text style={styles.title}>Student Super App</Text>
        <Text style={styles.subtitle}>
          Your all-in-one companion for notes, past question papers, SGPA/CGPA calculators & VTU community.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="Get Started"
          variant="primary"
          onPress={() => router.push('/(auth)/register')}
          style={styles.button}
        />
        <Button
          title="I already have an account"
          variant="outline"
          onPress={() => router.push('/(auth)/login')}
          style={styles.button}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text.darkPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.darkSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  actions: {
    gap: 12,
  },
  button: {
    width: '100%',
  },
});
