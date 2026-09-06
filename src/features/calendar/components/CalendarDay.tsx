import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AcademicEvent } from '../types/calendar.types';
import { EventDot } from './EventDot';

interface CalendarDayProps {
  dayNumber: number | null;
  dateStr?: string;
  isToday?: boolean;
  isSelected?: boolean;
  events?: AcademicEvent[];
  onPress?: (dateStr: string) => void;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  dayNumber,
  dateStr,
  isToday = false,
  isSelected = false,
  events = [],
  onPress,
}) => {
  if (!dayNumber || !dateStr) {
    return <View style={styles.emptyCell} />;
  }

  const uniqueCategories = Array.from(new Set(events.map((e) => e.category))).slice(0, 3);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!onPress}
      style={[
        styles.cell,
        isSelected && styles.cellSelected,
        isToday && !isSelected && styles.cellToday,
      ]}
      onPress={() => onPress && onPress(dateStr)}
    >
      <Text
        style={[
          styles.dayNum,
          isSelected && styles.dayNumSelected,
          isToday && !isSelected && styles.dayNumToday,
        ]}
      >
        {dayNumber}
      </Text>

      <View style={styles.dotsRow}>
        {uniqueCategories.map((cat) => (
          <EventDot key={cat} category={cat} size={5} />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emptyCell: {
    width: '14.28%',
    height: 44,
  },
  cell: {
    width: '14.28%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    position: 'relative',
  },
  cellSelected: {
    backgroundColor: '#0745E8',
  },
  cellToday: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1.5,
    borderColor: '#0745E8',
  },
  dayNum: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  dayNumSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  dayNumToday: {
    color: '#0745E8',
    fontWeight: '800',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 4,
  },
});
