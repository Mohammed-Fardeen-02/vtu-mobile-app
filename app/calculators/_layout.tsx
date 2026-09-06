import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/core/theme';

export default function CalculatorsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background.dark },
        headerTintColor: colors.text.darkPrimary,
        headerTitleStyle: { fontWeight: '700' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background.dark },
      }}
    >
      <Stack.Screen name="sgpa" options={{ title: 'SGPA Calculator' }} />
      <Stack.Screen name="cgpa" options={{ title: 'CGPA Calculator' }} />
      <Stack.Screen name="attendance" options={{ headerShown: false }} />
      <Stack.Screen name="goal-planner" options={{ headerShown: false }} />
    </Stack>
  );
}
