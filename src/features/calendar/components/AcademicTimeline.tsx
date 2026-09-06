import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AcademicTimelineStage } from '../types/calendar.types';
import { TimelineEvent } from './TimelineEvent';

interface AcademicTimelineProps {
  stages: AcademicTimelineStage[];
  semesterNumber?: number;
}

export const AcademicTimeline: React.FC<AcademicTimelineProps> = ({
  stages,
  semesterNumber = 5,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>5th Semester Academic Roadmap</Text>
        <Text style={styles.sub}>
          Visual progression from semester start to VTU SEE theory examinations
        </Text>
      </View>

      <View style={styles.timelineList}>
        {stages.map((stg, idx) => (
          <TimelineEvent
            key={stg.id}
            stage={stg}
            isLast={idx === stages.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  sub: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  timelineList: {
    paddingLeft: 4,
  },
});
