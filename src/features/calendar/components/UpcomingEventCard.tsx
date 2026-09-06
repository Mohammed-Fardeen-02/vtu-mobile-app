import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AcademicEvent } from '../types/calendar.types';
import { EventTypeChip } from './EventTypeChip';

interface UpcomingEventCardProps {
  event: AcademicEvent;
  onPress: (event: AcademicEvent) => void;
}

export const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({
  event,
  onPress,
}) => {
  // Format date e.g. "SEP 16"
  const dateObj = new Date(event.date);
  const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const dayNum = dateObj.getDate();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => onPress(event)}
    >
      {/* Left Date Badge Box */}
      <View style={styles.dateBox}>
        <Text style={styles.monthText}>{monthName}</Text>
        <Text style={styles.dayText}>{dayNum}</Text>
      </View>

      {/* Middle Information */}
      <View style={styles.infoCol}>
        <View style={styles.chipRow}>
          <EventTypeChip category={event.category} />
          {event.isImportant && (
            <View style={styles.importantBadge}>
              <Feather name="star" size={10} color="#D97706" />
              <Text style={styles.importantText}>Important</Text>
            </View>
          )}
        </View>

        <Text style={styles.eventTitle} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.metaRow}>
          {event.time && (
            <Text style={styles.metaText}>
              <Feather name="clock" size={11} color="#64748B" /> {event.time}
            </Text>
          )}
          <Text style={styles.metaText}>
            Sem {event.semester} {event.branch && event.branch !== 'ALL' ? `• ${event.branch}` : ''}
          </Text>
        </View>
      </View>

      <Feather name="chevron-right" size={18} color="#94A3B8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  dateBox: {
    width: 50,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  monthText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0745E8',
    letterSpacing: 0.5,
  },
  dayText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: -2,
  },
  infoCol: {
    flex: 1,
    marginRight: 8,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  importantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  importantText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 18,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaText: {
    fontSize: 11,
    color: '#64748B',
  },
});
