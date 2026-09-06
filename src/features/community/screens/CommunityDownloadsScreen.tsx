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
import { CommunityResourceCard } from '../components/CommunityResourceCard';
import { CommunityEmptyState } from '../components/CommunityEmptyState';

export const CommunityDownloadsScreen: React.FC = () => {
  const router = useRouter();
  const { resources, toggleUsefulVote } = useCommunityStore();
  const { items, toggleBookmark } = useSavedStore();

  const downloadedCommunityNotes = resources.filter((r) => {
    const item = items.find((i) => i.id === r.id);
    return item ? item.isDownloaded : false;
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>Community Downloads</Text>
            <Text style={styles.headerSub}>Offline Student Notes</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {downloadedCommunityNotes.length === 0 ? (
          <CommunityEmptyState
            title="No Downloaded Community Notes"
            description="Downloaded notes appear here so you can study offline anytime."
          />
        ) : (
          downloadedCommunityNotes.map((res) => {
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
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  safeTop: { backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
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
  headerTitleBox: { alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
  headerSub: { fontSize: 11, color: '#64748B', marginTop: 1 },
  scrollContent: { padding: 16 },
});
