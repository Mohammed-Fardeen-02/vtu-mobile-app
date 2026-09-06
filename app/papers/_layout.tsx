import React from 'react';
import { Stack } from 'expo-router';

export default function PapersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Question Papers' }} />
      <Stack.Screen name="saved" options={{ title: 'Saved Papers' }} />
      <Stack.Screen name="preview" options={{ title: 'Paper Preview' }} />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: 'Paper Details',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#0F172A',
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
