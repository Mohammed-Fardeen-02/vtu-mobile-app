import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ResourceUnavailableState } from '../components/ResourceUnavailableState';

export const ResourceUnavailableScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView edges={['top']} style={styles.safeTop} />

      <View style={styles.content}>
        <ResourceUnavailableState onPressBack={() => router.back()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  safeTop: { backgroundColor: '#FFFFFF' },
  content: { flex: 1, justifyContent: 'center' },
});
