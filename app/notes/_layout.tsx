import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/core/theme';

export default function NotesLayout() {
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
      <Stack.Screen name="index" options={{ title: 'Notes Library' }} />
      <Stack.Screen name="[id]" options={{ title: 'Note Details' }} />
    </Stack>
  );
}
