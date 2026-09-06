import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useCommunityStore } from '../store/useCommunityStore';
import { CommunityFilterSheet } from '../components/CommunityFilterSheet';

export const CommunityFiltersScreen: React.FC = () => {
  const router = useRouter();
  const { filterOptions, setFilterOptions, resetFilters } = useCommunityStore();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter Options</Text>
          <TouchableOpacity onPress={resetFilters}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <CommunityFilterSheet
        visible={true}
        filters={filterOptions}
        onClose={() => router.back()}
        onApplyFilters={(updated) => {
          setFilterOptions(updated);
          router.back();
        }}
        onReset={resetFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  safeTop: { backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
  resetText: { fontSize: 13, fontWeight: '700', color: '#0745E8' },
});
