import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ResourceDetailScreen, NoteReaderScreen } from '@/features/notes';

export default function NoteResourceRoute() {
  const { view } = useLocalSearchParams<{ view?: string }>();

  if (view === 'reader') {
    return <NoteReaderScreen />;
  }

  return <ResourceDetailScreen />;
}
