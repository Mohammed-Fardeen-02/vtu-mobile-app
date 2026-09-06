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
import { TrendingResourceCard } from '../components/TrendingResourceCard';

export const TrendingResourcesScreen: React.FC = () => {
  const router = useRouter();
  const { getTrendingResources } = useCommunityStore();

  const trendingList = getTrendingResources();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>Trending Leaderboard</Text>
            <Text style={styles.headerSub}>Top Voted Notes This Week</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Feather name="award" size={22} color="#059669" />
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>Weekly Scholar Leaderboard</Text>
            <Text style={styles.bannerSub}>Rankings calculated dynamically from real student upvotes & downloads.</Text>
          </View>
        </View>

        {trendingList.map((res, index) => (
          <TrendingResourceCard
            key={res.id}
            resource={res}
            rank={index + 1}
            onPress={() => router.push(`/community/resource/${res.id}` as any)}
          />
        ))}
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
  banner: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  bannerText: { flex: 1 },
  bannerTitle: { fontSize: 15, fontWeight: '800', color: '#047857' },
  bannerSub: { fontSize: 12, color: '#065F46', marginTop: 2, lineHeight: 16 },
});
