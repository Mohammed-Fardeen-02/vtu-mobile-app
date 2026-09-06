import React from 'react';
import { Stack } from 'expo-router';

export default function SavedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Bookmark & Downloads' }} />
    </Stack>
  );
}
