import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AcademicEvent } from '../types/calendar.types';
import { EventTypeChip } from './EventTypeChip';

interface NextEventHeroProps {
  event: AcademicEvent;
  onPress: (event: AcademicEvent) => void;
  onReminderPress: (event: AcademicEvent) => void;
}

export const NextEventHero: React.FC<NextEventHeroProps> = ({
  event,
  onPress,
  onReminderPress,
}) => {
  // Simple days remaining calculation (mock base Sept 3, 2026)
  const daysDiff = Math.max(0, Math.ceil((new Date(event.date).getTime() - new Date('2026-09-03').getTime()) / (1000 * 3600 * 24)));

  return (
    <View style={styles.heroCard}>
      {/* Top Tag Row */}
      <View style={styles.topRow}>
        <View style={styles.tagGroup}>
          <Feather name="zap" size={14} color="#0745E8" />
          <Text style={styles.tagText}>NEXT UPCOMING EVENT</Text>
        </View>

        <EventTypeChip category={event.category} />
      </View>

      {/* Main Title & Date */}
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(event)}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventSub}>
          {event.date} {event.time ? `• ${event.time}` : ''}
        </Text>
      </TouchableOpacity>

      {/* Countdown & Actions Row */}
      <View style={styles.footerRow}>
        <View style={styles.countdownBadge}>
          <Feather name="clock" size={14} color="#0745E8" />
          <Text style={styles.countdownText}>
            {daysDiff === 0 ? 'Today!' : daysDiff === 1 ? 'Tomorrow' : `In ${daysDiff} Days`}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.reminderBtn}
          onPress={() => onReminderPress(event)}
        >
          <Feather name="bell" size={14} color="#FFFFFF" />
          <Text style={styles.reminderBtnText}>Set Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: 20,
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tagGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0745E8',
    letterSpacing: 0.5,
  },
  eventTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 25,
    marginBottom: 4,
  },
  eventSub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countdownText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0745E8',
  },
  reminderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0745E8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  reminderBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
