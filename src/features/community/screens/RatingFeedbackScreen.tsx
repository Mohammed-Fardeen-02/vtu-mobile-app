import React, { useState } from 'react';
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
import { useCommunityStore } from '../store/useCommunityStore';

export const RatingFeedbackScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { submitRating } = useCommunityStore();

  const [selectedRating, setSelectedRating] = useState(5);

  const handleSubmit = () => {
    if (id) submitRating(id, selectedRating);
    Alert.alert('Rating Submitted!', 'Thank you for giving your feedback to the contributor.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rate Community Note</Text>
          <View style={{ width: 36 }} />
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <Text style={styles.title}>How useful was this document?</Text>
        <Text style={styles.subTitle}>
          Your rating helps rank top notes for VTU students during exam preparation.
        </Text>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setSelectedRating(star)}>
              <Feather
                name="star"
                size={36}
                color={star <= selectedRating ? '#F59E0B' : '#CBD5E1'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.ratingLabel}>
          {selectedRating === 5
            ? '⭐⭐⭐⭐⭐ Outstanding Notes!'
            : selectedRating === 4
            ? '⭐⭐⭐⭐ Very Good Quality'
            : selectedRating === 3
            ? '⭐⭐⭐ Moderate Quality'
            : '⭐⭐ Needs Improvement'}
        </Text>

        <TouchableOpacity activeOpacity={0.85} style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit Rating Feedback</Text>
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
  title: { fontSize: 20, fontWeight: '800', color: '#0F172A', textAlign: 'center', marginBottom: 8 },
  subTitle: { fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 19, marginBottom: 24 },
  starsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  ratingLabel: { fontSize: 14, fontWeight: '800', color: '#0745E8', marginBottom: 30 },
  submitBtn: {
    backgroundColor: '#0745E8',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  submitBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
