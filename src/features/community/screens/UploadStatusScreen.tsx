import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCommunityStore } from '../store/useCommunityStore';
import { UploadProgress } from '../components/UploadProgress';
import { UploadStatusCard } from '../components/UploadStatusCard';

export const UploadStatusScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { uploadStatus, uploadProgressPercent, getResourceById, uploadDraft } =
    useCommunityStore();

  const resource = getResourceById(id || '') || {
    id: id || 'cr-1',
    title: uploadDraft.title || 'Computer Networks Lecture Notes',
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView edges={['top']} style={styles.safeTop} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {uploadStatus !== 'published' && uploadStatus !== 'rejected' && (
          <UploadProgress status={uploadStatus} progressPercent={uploadProgressPercent} />
        )}

        <UploadStatusCard
          status={uploadStatus}
          resourceTitle={resource.title}
          onPressView={() => router.push(`/community/resource/${resource.id}` as any)}
          onPressMyContributions={() => router.push('/community/my-contributions' as any)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  safeTop: { backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 16 },
});
