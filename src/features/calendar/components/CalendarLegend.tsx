import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EventCategory } from '../types/calendar.types';
import { EventDot } from './EventDot';

const LEGEND_ITEMS: EventCategory[] = [
  'Internals',
  'Exams',
  'Lab Exams',
  'Holidays',
  'Results',
];

export const CalendarLegend: React.FC = () => {
  return (
    <View style={styles.container}>
      {LEGEND_ITEMS.map((item) => (
        <View key={item} style={styles.legendItem}>
          <EventDot category={item} size={6} />
          <Text style={styles.legendText}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
});
