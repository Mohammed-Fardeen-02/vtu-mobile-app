import React from 'react';
import { Stack } from 'expo-router';

export default function GoalPlannerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'GPA Goal Planner' }} />
      <Stack.Screen name="result" options={{ title: 'Goal Calculation Result' }} />
      <Stack.Screen name="projections" options={{ title: 'Semester Projections' }} />
      <Stack.Screen name="breakdown" options={{ title: 'Semester Goal Breakdown' }} />
      <Stack.Screen name="saved" options={{ title: 'Saved Target Roadmaps' }} />
    </Stack>
  );
}
