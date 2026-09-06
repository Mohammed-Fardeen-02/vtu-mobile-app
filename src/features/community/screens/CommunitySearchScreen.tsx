import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useCommunityStore } from '../store/useCommunityStore';
import { useSavedStore } from '@/features/saved/store/useSavedStore';
import { CommunitySearchBar } from '../components/CommunitySearchBar';
import { CommunityResourceCard } from '../components/CommunityResourceCard';
import { CommunityTag } from '../components/CommunityTag';

export const CommunitySearchScreen: React.FC = () => {
  const router = useRouter();
  const { filterOptions, setFilterOptions, getFilteredResources, toggleUsefulVote } =
    useCommunityStore();
  const { items, toggleBookmark } = useSavedStore();

  const searchResults = getFilteredResources();
  const popularTags = [
    'Handwritten Notes',
    'Computer Networks',
    'DBMS Normalization',
    'ATC State Diagrams',
    '2022 Scheme',
    'Solved Numericals',
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Community Notes</Text>
          <View style={{ width: 36 }} />
        </View>

        <CommunitySearchBar
          value={filterOptions.searchQuery}
          onChangeText={(text) => setFilterOptions({ searchQuery: text })}
          placeholder="Search by topic, subject code (21CS52), or author..."
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Popular Tags */}
        <Text style={styles.sectionLabel}>Popular Search Tags</Text>
        <View style={styles.tagsRow}>
          {popularTags.map((t) => (
            <CommunityTag
              key={t}
              tag={t}
              onPress={() => setFilterOptions({ searchQuery: t })}
            />
          ))}
        </View>

        {/* Search Results */}
        <Text style={styles.resultsHeader}>
          {filterOptions.searchQuery ? `Results for "${filterOptions.searchQuery}"` : 'All Community Resources'} ({searchResults.length})
        </Text>

        {searchResults.map((res) => {
          const savedItem = items.find((i) => i.id === res.id);
          const isBookmarked = savedItem ? savedItem.isBookmarked : false;

          return (
            <CommunityResourceCard
              key={res.id}
              resource={res}
              isBookmarked={isBookmarked}
              onToggleBookmark={() => toggleBookmark(res.id)}
              onToggleUseful={() => toggleUsefulVote(res.id)}
              onPressCard={() => router.push(`/community/resource/${res.id}` as any)}
              onPressContributor={() =>
                router.push(`/community/contributor/${res.contributor.id}` as any)
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeTop: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  resultsHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
});
