import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AcademicTimelineStage } from '../types/calendar.types';

interface TimelineEventProps {
  stage: AcademicTimelineStage;
  isLast?: boolean;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
  stage,
  isLast = false,
}) => {
  const isCompleted = stage.status === 'COMPLETED';
  const isInProgress = stage.status === 'IN_PROGRESS';

  return (
    <View style={styles.container}>
      {/* Left Axis Line & Node */}
      <View style={styles.axisCol}>
        <View
          style={[
            styles.nodeCircle,
            isCompleted && styles.nodeCompleted,
            isInProgress && styles.nodeInProgress,
          ]}
        >
          <Feather
            name={isCompleted ? 'check' : isInProgress ? 'clock' : 'circle'}
            size={12}
            color={isCompleted || isInProgress ? '#FFFFFF' : '#94A3B8'}
          />
        </View>

        {!isLast && (
          <View
            style={[
              styles.lineTrack,
              isCompleted && styles.lineCompleted,
            ]}
          />
        )}
      </View>

      {/* Right Content Card */}
      <View
        style={[
          styles.contentCard,
          isInProgress && styles.contentCardInProgress,
        ]}
      >
        <View style={styles.titleRow}>
          <Text style={styles.stageTitle}>{stage.stageName}</Text>
          <View
            style={[
              styles.statusPill,
              isCompleted && { backgroundColor: '#D1FAE5' },
              isInProgress && { backgroundColor: '#EEF2FF' },
            ]}
          >
            <Text
              style={[
                styles.statusPillText,
                isCompleted && { color: '#059669' },
                isInProgress && { color: '#0745E8' },
              ]}
            >
              {stage.status.replace('_', ' ')}
            </Text>
          </View>
        </View>

        <Text style={styles.dateRangeText}>{stage.dateRange}</Text>
        <Text style={styles.descText}>{stage.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  axisCol: {
    alignItems: 'center',
    width: 32,
    marginRight: 12,
  },
  nodeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  nodeCompleted: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  nodeInProgress: {
    backgroundColor: '#0745E8',
    borderColor: '#0745E8',
  },
  lineTrack: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  lineCompleted: {
    backgroundColor: '#059669',
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contentCardInProgress: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  stageTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
  },
  dateRangeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0745E8',
    marginBottom: 4,
  },
  descText: {
    fontSize: 12,
    color: '#64748B',
  },
});
