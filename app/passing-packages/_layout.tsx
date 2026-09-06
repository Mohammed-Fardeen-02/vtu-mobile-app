import React from 'react';
import { Stack } from 'expo-router';

export default function PassingPackagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Passing Packages' }} />
      <Stack.Screen name="select" options={{ title: 'Select Semester & Branch' }} />
      <Stack.Screen name="overview/[id]" options={{ title: 'Package Overview' }} />
      <Stack.Screen name="unit-weightage/[id]" options={{ title: 'Unit Weightage' }} />
      <Stack.Screen name="important-questions/[id]" options={{ title: 'Important Questions' }} />
      <Stack.Screen name="repeated-questions/[id]" options={{ title: 'Repeated Questions' }} />
      <Stack.Screen name="expected-questions/[id]" options={{ title: 'Most Expected Questions' }} />
      <Stack.Screen name="revision/[id]" options={{ title: 'Last-Minute Revision' }} />
      <Stack.Screen name="night-before/[id]" options={{ title: '1-Night-Before Exam' }} />
      <Stack.Screen name="question/[id]" options={{ title: 'Question Details' }} />
      <Stack.Screen name="pdf/[id]" options={{ title: 'Revision PDF Viewer' }} />
      <Stack.Screen name="saved" options={{ title: 'Saved Packages' }} />
      <Stack.Screen name="empty" options={{ title: 'Package Unavailable' }} />
    </Stack>
  );
}
