import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AcademicEvent } from '../types/calendar.types';
import { CalendarDay } from './CalendarDay';

interface CalendarGridProps {
  year: number;
  month: number; // 0-indexed (8 = Sep)
  selectedDate: string; // "YYYY-MM-DD"
  events: AcademicEvent[];
  onSelectDate: (dateStr: string) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  selectedDate,
  events,
  onSelectDate,
}) => {
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const todayDateObj = new Date();
  const todayStr = `${todayDateObj.getFullYear()}-${String(todayDateObj.getMonth() + 1).padStart(2, '0')}-${String(todayDateObj.getDate()).padStart(2, '0')}`;

  const cells: Array<{ dayNumber: number | null; dateStr?: string }> = [];

  // Padding cells before day 1
  for (let i = 0; i < firstDayIndex; i++) {
    cells.push({ dayNumber: null });
  }

  // Month days
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;
    cells.push({ dayNumber: day, dateStr });
  }

  return (
    <View style={styles.container}>
      {/* Day of Week Header */}
      <View style={styles.weekdayHeader}>
        {WEEKDAYS.map((wd) => (
          <Text key={wd} style={styles.weekdayText}>
            {wd}
          </Text>
        ))}
      </View>

      {/* Grid of Cells */}
      <View style={styles.grid}>
        {cells.map((cell, index) => {
          if (!cell.dayNumber || !cell.dateStr) {
            return <CalendarDay key={`empty-${index}`} dayNumber={null} />;
          }

          const dayEvents = events.filter((e) => e.date === cell.dateStr);
          const isToday = cell.dateStr === '2026-09-03' || cell.dateStr === todayStr;
          const isSelected = cell.dateStr === selectedDate;

          return (
            <CalendarDay
              key={cell.dateStr}
              dayNumber={cell.dayNumber}
              dateStr={cell.dateStr}
              isToday={isToday}
              isSelected={isSelected}
              events={dayEvents}
              onPress={onSelectDate}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  weekdayHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayText: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
