import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PassingQuestion } from '../types/passingPackages.types';
import { QuestionPriorityBadge } from './QuestionPriorityBadge';
import { BookmarkButton } from './BookmarkButton';

interface ExpectedQuestionCardProps {
  question: PassingQuestion;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onPressQuestion: () => void;
}

export const ExpectedQuestionCard: React.FC<ExpectedQuestionCardProps> = ({
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
      <View style={styles.headerRow}>
        <QuestionPriorityBadge priority={question.priority} />
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

      <View style={styles.metaRow}>
        <View style={styles.unitChip}>
          <Text style={styles.unitChipText}>Unit {question.unitNumber} • {question.unitTitle}</Text>
        </View>

        {question.marks ? (
          <View style={styles.marksChip}>
            <Feather name="award" size={11} color="#0745E8" />
            <Text style={styles.marksChipText}>{question.marks}M</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.disclaimerBar}>
        <Feather name="shield" size={12} color="#0284C7" />
        <Text style={styles.disclaimerText}>Suggested focus topic for upcoming VTU examination</Text>
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
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  unitChip: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flex: 1,
  },
  unitChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  marksChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  marksChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0745E8',
  },
  disclaimerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0F9FF',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#0369A1',
    fontWeight: '600',
  },
});
