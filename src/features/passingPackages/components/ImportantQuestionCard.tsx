import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PassingQuestion } from '../types/passingPackages.types';
import { QuestionPriorityBadge } from './QuestionPriorityBadge';
import { BookmarkButton } from './BookmarkButton';

interface ImportantQuestionCardProps {
  question: PassingQuestion;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onPressQuestion: () => void;
  onPressNotes?: () => void;
}

export const ImportantQuestionCard: React.FC<ImportantQuestionCardProps> = ({
  question,
  isBookmarked,
  onToggleBookmark,
  onPressQuestion,
  onPressNotes,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.card}
      onPress={onPressQuestion}
    >
      <View style={styles.topRow}>
        <View style={styles.unitPill}>
          <Text style={styles.unitPillText}>UNIT {question.unitNumber}</Text>
        </View>
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

      <View style={styles.tagsRow}>
        {question.marks ? (
          <View style={styles.marksBadge}>
            <Feather name="award" size={11} color="#0745E8" />
            <Text style={styles.marksText}>{question.marks} Marks</Text>
          </View>
        ) : null}

        {question.bloomLevel ? (
          <View style={styles.bloomBadge}>
            <Text style={styles.bloomText}>Bloom {question.bloomLevel}</Text>
          </View>
        ) : null}

        {question.diagramAvailable && (
          <View style={styles.diagramBadge}>
            <Feather name="image" size={11} color="#059669" />
            <Text style={styles.diagramText}>Diagram</Text>
          </View>
        )}
      </View>

      {/* Source Years History */}
      {question.sourceYears && question.sourceYears.length > 0 && (
        <View style={styles.yearsRow}>
          <Text style={styles.yearsLabel}>Appeared in:</Text>
          {question.sourceYears.map((year, idx) => (
            <View key={idx} style={styles.yearTag}>
              <Text style={styles.yearTagText}>{year}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Footer Action Bar */}
      <View style={styles.footer}>
        {question.relatedNoteId ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.notesBtn}
            onPress={(e) => {
              e.stopPropagation();
              onPressNotes?.();
            }}
          >
            <Feather name="book-open" size={13} color="#0745E8" />
            <Text style={styles.notesBtnText}>View Related Notes</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        <View style={styles.detailsLink}>
          <Text style={styles.detailsLinkText}>Question Details</Text>
          <Feather name="chevron-right" size={14} color="#0745E8" />
        </View>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  unitPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  unitPillText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '700',
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
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  marksBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  marksText: {
    color: '#0745E8',
    fontSize: 11,
    fontWeight: '700',
  },
  bloomBadge: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  bloomText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '600',
  },
  diagramBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  diagramText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  yearsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 8,
  },
  yearsLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  yearTag: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  yearTagText: {
    fontSize: 10,
    color: '#334155',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  notesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  notesBtnText: {
    color: '#0745E8',
    fontSize: 12,
    fontWeight: '700',
  },
  detailsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  detailsLinkText: {
    color: '#0745E8',
    fontSize: 12,
    fontWeight: '700',
  },
});
