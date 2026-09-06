import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AttendanceHistoryLog } from '../types/attendance.types';

interface AttendanceHistoryItemProps {
  item: AttendanceHistoryLog;
}

export const AttendanceHistoryItem: React.FC<AttendanceHistoryItemProps> = ({
  item,
}) => {
  const getIconConfig = () => {
    switch (item.type) {
      case 'ATTENDED':
        return { icon: 'check-circle' as const, bg: '#D1FAE5', color: '#059669', title: 'Attended Class' };
      case 'MISSED':
        return { icon: 'x-circle' as const, bg: '#FEF2F2', color: '#EF4444', title: 'Missed Class' };
      case 'EDITED':
        return { icon: 'edit-2' as const, bg: '#EEF2FF', color: '#0745E8', title: 'Updated Record' };
      case 'ADDED':
        return { icon: 'plus-circle' as const, bg: '#FEF3C7', color: '#D97706', title: 'Added Subject' };
      default:
        return { icon: 'info' as const, bg: '#F1F5F9', color: '#64748B', title: 'Log' };
    }
  };

  const config = getIconConfig();

  return (
    <View style={styles.container}>
      <View style={[styles.iconBox, { backgroundColor: config.bg }]}>
        <Feather name={config.icon} size={18} color={config.color} />
      </View>

      <View style={styles.infoCol}>
        <Text style={styles.titleText}>{config.title}</Text>
        <Text style={styles.subjectText}>
          {item.subjectCode} • {item.subjectName}
        </Text>
      </View>

      <View style={styles.timeCol}>
        <Text style={styles.timeText}>{item.timestamp}</Text>
        <Text style={styles.countText}>
          {item.type === 'ATTENDED' ? `+${item.classesCount}` : item.type === 'MISSED' ? `-${item.classesCount}` : `${item.classesCount} cls`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  subjectText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  timeCol: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  countText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
});
