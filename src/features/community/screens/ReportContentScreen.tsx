import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export const ReportContentScreen: React.FC = () => {
  const router = useRouter();
  const { id, reason } = useLocalSearchParams<{ id: string; reason?: string }>();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report Received</Text>
          <View style={{ width: 36 }} />
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Feather name="shield" size={40} color="#059669" />
        </View>

        <Text style={styles.title}>Thank You for Moderating</Text>
        <Text style={styles.reasonText}>Report Category: {reason || 'Content Quality Issue'}</Text>
        <Text style={styles.subText}>
          Our VTU academic moderation team will review this document within 24 hours. If it violates syllabus accuracy or copyright standards, it will be unlisted.
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.doneBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.doneBtnText}>Return to Community</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
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
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  reasonText: { fontSize: 13, fontWeight: '700', color: '#0745E8', marginBottom: 12 },
  subText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  doneBtn: {
    backgroundColor: '#0745E8',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  doneBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
