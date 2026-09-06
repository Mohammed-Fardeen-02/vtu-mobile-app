import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StudyHistory } from '../types/home.types';

interface ContinueStudyingCardProps {
  history: StudyHistory | null;
}

export const ContinueStudyingCard: React.FC<ContinueStudyingCardProps> = ({ history }) => {
  const router = useRouter();

  if (!history) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconBox}>
          <Feather name="book-open" size={24} color="#0745E8" />
        </View>
        <Text style={styles.emptyTitle}>Start Learning Today</Text>
        <Text style={styles.emptySub}>
          Explore subject notes, handwritten PDFs, and question papers for your semester.
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.startBtn}
          onPress={() => router.push('/(tabs)/library')}
        >
          <Text style={styles.startBtnText}>Browse Library</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Continue Studying</Text>
        <Text style={styles.timeText}>{history.lastOpenedTime}</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.topRow}>
          <View style={styles.iconBox}>
            <Feather name="book-open" size={22} color="#0745E8" />
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.subjectText}>{history.subject}</Text>
            <Text style={styles.unitText}>{history.unit} • {history.resourceTitle}</Text>
          </View>
          <View style={styles.progressBadge}>
            <Text style={styles.progressBadgeText}>{history.progress}%</Text>
          </View>
        </View>

        {/* Progress Bar Track */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${history.progress}%` }]} />
        </View>

        {/* Action Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.continueBtn}
          onPress={() => router.push(`/notes/${history.resourceId}?view=reader`)}
        >
          <Text style={styles.continueBtnText}>Continue Reading</Text>
          <Feather name="arrow-right" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  timeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  cardContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoWrapper: {
    flex: 1,
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  unitText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  progressBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  progressBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16A34A',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0745E8',
    borderRadius: 3,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0745E8',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
  emptyIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  startBtn: {
    backgroundColor: '#0745E8',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
  startBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
