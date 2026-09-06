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

export const MyContributionsScreen: React.FC = () => {
  const router = useRouter();
  const { myUploads, toggleUsefulVote } = useCommunityStore();
  const { items, toggleBookmark } = useSavedStore();

  const totalUpvotes = myUploads.reduce((acc, curr) => acc + curr.usefulCount, 0);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>My Contributions</Text>
            <Text style={styles.headerSub}>{myUploads.length} Shared Documents</Text>
          </View>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => router.push('/community/upload' as any)}
          >
            <Feather name="plus" size={18} color="#7C3AED" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Contributor Stats Banner */}
        <View style={styles.statsCard}>
          <View style={styles.statTile}>
            <Text style={styles.statNum}>{myUploads.length}</Text>
            <Text style={styles.statLabel}>Uploaded Notes</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statTile}>
            <Text style={styles.statNum}>{totalUpvotes}</Text>
            <Text style={styles.statLabel}>Useful Votes Earned</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Uploaded Resources</Text>

        {myUploads.length === 0 ? (
          <CommunityEmptyState
            title="No Contributions Yet"
            description="Start sharing your class notes to earn contributor badges!"
            onPressUpload={() => router.push('/community/upload' as any)}
          />
        ) : (
          myUploads.map((res) => {
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
  uploadBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { padding: 16 },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statTile: { alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  statLabel: { fontSize: 11, color: '#64748B', marginTop: 2 },
  divider: { width: 1, height: 28, backgroundColor: '#CBD5E1' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
});
