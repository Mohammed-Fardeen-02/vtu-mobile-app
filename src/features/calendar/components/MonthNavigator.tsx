import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface MonthNavigatorProps {
  year: number;
  month: number; // 0-indexed (8 = September)
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayPress?: () => void;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onTodayPress,
}) => {
  const title = `${MONTH_NAMES[month]} ${year}`;

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.monthTitle}>{title}</Text>
        {onTodayPress && (
          <TouchableOpacity activeOpacity={0.8} style={styles.todayChip} onPress={onTodayPress}>
            <Text style={styles.todayChipText}>Today</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.arrowsRow}>
        <TouchableOpacity activeOpacity={0.8} style={styles.arrowBtn} onPress={onPrevMonth}>
          <Feather name="chevron-left" size={18} color="#0F172A" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.arrowBtn} onPress={onNextMonth}>
          <Feather name="chevron-right" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  todayChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
  },
  todayChipText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0745E8',
  },
  arrowsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  arrowBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
