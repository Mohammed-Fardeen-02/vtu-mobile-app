import React from 'react';
import { Stack } from 'expo-router';

export default function AttendanceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Attendance Calculator' }} />
      <Stack.Screen name="detail" options={{ title: 'Subject Attendance Detail' }} />
      <Stack.Screen name="calculator" options={{ title: 'Attendance Goal Calculator' }} />
      <Stack.Screen name="history" options={{ title: 'Attendance History' }} />
    </Stack>
  );
}
