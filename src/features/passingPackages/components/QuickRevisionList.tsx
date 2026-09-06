import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PassingQuestion } from '../types/passingPackages.types';

interface QuickRevisionListProps {
  questions: PassingQuestion[];
  completedIds: string[];
  onToggleComplete: (id: string) => void;
  onPressQuestion: (q: PassingQuestion) => void;
}

export const QuickRevisionList: React.FC<QuickRevisionListProps> = ({
  questions,
  completedIds,
  onToggleComplete,
  onPressQuestion,
}) => {
  return (
    <View style={styles.container}>
      {questions.map((item, idx) => {
        const isDone = completedIds.includes(item.id);
        return (
          <TouchableOpacity
            key={item.id || idx}
            activeOpacity={0.85}
            style={[styles.itemCard, isDone && styles.itemCardDone]}
            onPress={() => onPressQuestion(item)}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.checkbox, isDone && styles.checkboxDone]}
              onPress={() => onToggleComplete(item.id)}
            >
              {isDone && <Feather name="check" size={14} color="#FFFFFF" />}
            </TouchableOpacity>

            <View style={styles.contentWrapper}>
              <View style={styles.topMeta}>
                <Text style={styles.stepNumber}>STEP {idx + 1}</Text>
                <View style={styles.unitPill}>
                  <Text style={styles.unitText}>Unit {item.unitNumber}</Text>
                </View>
                {item.marks ? (
                  <View style={styles.marksTag}>
                    <Text style={styles.marksTagText}>{item.marks}M</Text>
                  </View>
                ) : null}
              </View>

              <Text
                style={[styles.questionTitle, isDone && styles.textDone]}
                numberOfLines={2}
              >
                {item.questionText}
              </Text>

              {item.diagramTitle ? (
                <View style={styles.diagramHint}>
                  <Feather name="image" size={11} color="#059669" />
                  <Text style={styles.diagramHintText}>Must draw: {item.diagramTitle}</Text>
                </View>
              ) : null}
            </View>

            <Feather name="chevron-right" size={18} color="#94A3B8" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  itemCardDone: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    opacity: 0.75,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxDone: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  contentWrapper: {
    flex: 1,
  },
  topMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  stepNumber: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0745E8',
    letterSpacing: 0.5,
  },
  unitPill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  unitText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0745E8',
  },
  marksTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  marksTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  questionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 19,
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  diagramHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  diagramHintText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
});
