import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { EventCategory } from '../types/calendar.types';
import { EventTypeChip } from './EventTypeChip';

interface CalendarFilterSheetProps {
  visible: boolean;
  activeCategory: EventCategory | 'All';
  onSelectCategory: (cat: EventCategory | 'All') => void;
  onClose: () => void;
}

const CATEGORIES: Array<EventCategory | 'All'> = [
  'All',
  'Internals',
  'Exams',
  'Lab Exams',
  'Holidays',
  'Results',
  'Semester Dates',
  'Other',
];

export const CalendarFilterSheet: React.FC<CalendarFilterSheetProps> = ({
  visible,
  activeCategory,
  onSelectCategory,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Filter Academic Events</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.chipsWrap} showsVerticalScrollIndicator={false}>
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  activeOpacity={0.8}
                  style={[styles.filterCard, isSelected && styles.filterCardSelected]}
                  onPress={() => {
                    onSelectCategory(cat);
                    onClose();
                  }}
                >
                  <EventTypeChip category={cat} selected={isSelected} />
                  {isSelected && <Feather name="check" size={16} color="#0745E8" />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
    maxHeight: '70%',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsWrap: {
    gap: 10,
  },
  filterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
});
