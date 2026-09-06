import React from 'react';
import { Stack } from 'expo-router';

export default function NotificationsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Notification Center' }} />
      <Stack.Screen name="detail" options={{ title: 'Notification Details' }} />
      <Stack.Screen name="preferences" options={{ title: 'Notification Preferences' }} />
    </Stack>
  );
}
