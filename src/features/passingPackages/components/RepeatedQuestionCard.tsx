import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PassingQuestion } from '../types/passingPackages.types';
import { QuestionFrequencyBadge } from './QuestionFrequencyBadge';
import { QuestionPriorityBadge } from './QuestionPriorityBadge';
import { BookmarkButton } from './BookmarkButton';

interface RepeatedQuestionCardProps {
  question: PassingQuestion;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onPressQuestion: () => void;
}

export const RepeatedQuestionCard: React.FC<RepeatedQuestionCardProps> = ({
  question,
  isBookmarked,
  onToggleBookmark,
  onPressQuestion,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.card}
      onPress={onPressQuestion}
    >
      <View style={styles.topRow}>
        <QuestionFrequencyBadge frequency={question.frequency || 'Repeated Question'} size="small" />
        <QuestionPriorityBadge priority={question.priority} size="small" />
        <View style={styles.spacer} />
        <BookmarkButton
          isBookmarked={isBookmarked}
          onPress={onToggleBookmark}
          size={16}
        />
      </View>

      <Text style={styles.questionText} numberOfLines={3}>
        {question.questionText}
      </Text>

      <View style={styles.metaStrip}>
        <View style={styles.unitBadge}>
          <Text style={styles.unitText}>Unit {question.unitNumber}</Text>
        </View>

        {question.marks ? (
          <View style={styles.marksBadge}>
            <Feather name="award" size={11} color="#0745E8" />
            <Text style={styles.marksText}>{question.marks} Marks</Text>
          </View>
        ) : null}

        {question.diagramAvailable && (
          <View style={styles.diagramBadge}>
            <Feather name="image" size={11} color="#059669" />
            <Text style={styles.diagramText}>Diagram Needed</Text>
          </View>
        )}
      </View>

      {/* Repeated Years Timeline Bar */}
      {question.sourceYears && question.sourceYears.length > 0 && (
        <View style={styles.yearsBox}>
          <View style={styles.yearsHeader}>
            <Feather name="clock" size={12} color="#6D28D9" />
            <Text style={styles.yearsTitle}>Historical VTU Exams:</Text>
          </View>
          <View style={styles.yearsList}>
            {question.sourceYears.map((yr, index) => (
              <View key={index} style={styles.yearChip}>
                <Text style={styles.yearChipText}>{yr}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.footerRow}>
        <Text style={styles.repeatCountText}>
          ⚡ High frequency question in 5-year pattern
        </Text>
        <Feather name="chevron-right" size={16} color="#7C3AED" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  spacer: {
    flex: 1,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 22,
    marginBottom: 10,
  },
  metaStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  unitBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  unitText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  marksBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  marksText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0745E8',
  },
  diagramBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  diagramText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  yearsBox: {
    backgroundColor: '#FAF5FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: '#F3E8FF',
    borderWidth: 1,
  },
  yearsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  yearsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6D28D9',
  },
  yearsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  yearChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderColor: '#DDD6FE',
    borderWidth: 1,
  },
  yearChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#5B21B6',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F5F3FF',
  },
  repeatCountText: {
    fontSize: 11,
    color: '#6D28D9',
    fontWeight: '700',
  },
});
