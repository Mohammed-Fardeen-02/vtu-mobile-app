import React from 'react';
import { Stack } from 'expo-router';

export default function CalendarLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Academic Calendar' }} />
      <Stack.Screen name="month" options={{ title: 'Full Month Calendar' }} />
      <Stack.Screen name="detail" options={{ title: 'Event Details' }} />
      <Stack.Screen name="upcoming" options={{ title: 'Upcoming Events' }} />
      <Stack.Screen name="timeline" options={{ title: 'Academic Timeline' }} />
    </Stack>
  );
}
