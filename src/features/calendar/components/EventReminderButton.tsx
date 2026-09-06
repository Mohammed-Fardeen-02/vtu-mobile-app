import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCalendarStore } from '../store/useCalendarStore';
import { AcademicEvent } from '../types/calendar.types';

interface EventReminderButtonProps {
  event: AcademicEvent;
}

export const EventReminderButton: React.FC<EventReminderButtonProps> = ({
  event,
}) => {
  const { remindersMap, toggleReminder } = useCalendarStore();
  const isSet = !!remindersMap[event.id];

  const [modalVisible, setModalVisible] = useState(false);
  const [timing, setTiming] = useState<'1day' | 'sameDay' | '1week'>('1day');

  const handleToggle = () => {
    toggleReminder(event.id);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.button, isSet && styles.buttonSet]}
        onPress={() => setModalVisible(true)}
      >
        <Feather name={isSet ? 'bell-off' : 'bell'} size={16} color={isSet ? '#059669' : '#0745E8'} />
        <Text style={[styles.buttonText, isSet && styles.buttonTextSet]}>
          {isSet ? 'Reminder Set' : 'Set Calendar Reminder'}
        </Text>
      </TouchableOpacity>

      {/* Reminder Config Modal Preview (CAL-08) */}
      <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setModalVisible(false)} />

          <View style={styles.modalCard}>
            <View style={styles.iconCircle}>
              <Feather name="bell" size={24} color="#0745E8" />
            </View>

            <Text style={styles.modalTitle}>Set Event Reminder</Text>
            <Text style={styles.eventTitleText}>{event.title}</Text>

            <View style={styles.optionsList}>
              <TouchableOpacity
                style={[styles.optRow, timing === '1day' && styles.optRowActive]}
                onPress={() => setTiming('1day')}
              >
                <Text style={styles.optText}>1 day before at 9:00 AM</Text>
                {timing === '1day' && <Feather name="check" size={16} color="#0745E8" />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optRow, timing === 'sameDay' && styles.optRowActive]}
                onPress={() => setTiming('sameDay')}
              >
                <Text style={styles.optText}>Morning of event (7:00 AM)</Text>
                {timing === 'sameDay' && <Feather name="check" size={16} color="#0745E8" />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optRow, timing === '1week' && styles.optRowActive]}
                onPress={() => setTiming('1week')}
              >
                <Text style={styles.optText}>1 week before</Text>
                {timing === '1week' && <Feather name="check" size={16} color="#0745E8" />}
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.9} style={styles.saveBtn} onPress={handleToggle}>
              <Text style={styles.saveBtnText}>
                {isSet ? 'Remove Reminder' : 'Confirm Reminder'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonSet: {
    backgroundColor: '#D1FAE5',
    borderColor: '#6EE7B7',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0745E8',
  },
  buttonTextSet: {
    color: '#059669',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  eventTitleText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  optionsList: {
    width: '100%',
    gap: 8,
    marginBottom: 20,
  },
  optRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  optRowActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#0745E8',
  },
  optText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  saveBtn: {
    width: '100%',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0745E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
