import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AcademicEvent } from '../types/calendar.types';
import { EventTypeChip } from './EventTypeChip';

interface EventDetailsCardProps {
  event: AcademicEvent;
}

export const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event }) => {
  return (
    <View style={styles.card}>
      {/* Category Tag */}
      <View style={styles.topRow}>
        <EventTypeChip category={event.category} selected />
        {event.vtuCircularRef && (
          <View style={styles.circularBadge}>
            <Feather name="file-text" size={12} color="#0745E8" />
            <Text style={styles.circularText}>Official VTU Circular</Text>
          </View>
        )}
      </View>

      {/* Event Title */}
      <Text style={styles.title}>{event.title}</Text>

      {/* Date & Time Grid */}
      <View style={styles.metaBox}>
        <View style={styles.metaRow}>
          <Feather name="calendar" size={16} color="#0745E8" />
          <Text style={styles.metaValue}>{event.date}</Text>
        </View>

        {event.time && (
          <View style={styles.metaRow}>
            <Feather name="clock" size={16} color="#0745E8" />
            <Text style={styles.metaValue}>{event.time}</Text>
          </View>
        )}

        {event.venue && (
          <View style={styles.metaRow}>
            <Feather name="map-pin" size={16} color="#0745E8" />
            <Text style={styles.metaValue}>{event.venue}</Text>
          </View>
        )}
      </View>

      {/* Academic Context Badge */}
      <View style={styles.contextCard}>
        <Text style={styles.contextTitle}>ACADEMIC SCOPE</Text>
        <Text style={styles.contextValue}>
          Semester {event.semester} • Branch: {event.branch || 'All Branches'} • Scheme: {event.scheme || 'All Schemes'}
        </Text>
      </View>

      {/* Description */}
      {event.description && (
        <View style={styles.descSection}>
          <Text style={styles.descTitle}>Event Description & Guidelines</Text>
          <Text style={styles.descText}>{event.description}</Text>
        </View>
      )}

      {/* Circular Reference ID */}
      {event.vtuCircularRef && (
        <View style={styles.refFooter}>
          <Text style={styles.refText}>Ref: {event.vtuCircularRef}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  circularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  circularText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0745E8',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 28,
    marginBottom: 16,
  },
  metaBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  contextCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  contextTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  contextValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
  descSection: {
    marginBottom: 14,
  },
  descTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  descText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
  },
  refFooter: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  refText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
});
