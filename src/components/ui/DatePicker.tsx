import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface DatePickerProps {
  label?: string;
  value?: string; // Format: YYYY-MM-DD
  onChange: (formattedDate: string) => void;
  error?: string;
  placeholder?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  placeholder = 'Select Date of Birth',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Parse existing date or default to 2003-01-15
  const initialDate = value ? new Date(value) : new Date(2003, 0, 15);
  const isValidInitial = !isNaN(initialDate.getTime());

  const [selectedYear, setSelectedYear] = useState<number>(
    isValidInitial ? initialDate.getFullYear() : 2003
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    isValidInitial ? initialDate.getMonth() : 0
  );
  const [selectedDay, setSelectedDay] = useState<number>(
    isValidInitial ? initialDate.getDate() : 15
  );

  const [viewMode, setViewMode] = useState<'day' | 'year'>('day');

  // Generate Year list (1980 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);

  // Calculate days in selected month & year
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleConfirm = () => {
    const monthStr = String(selectedMonth + 1).padStart(2, '0');
    const dayStr = String(selectedDay).padStart(2, '0');
    const dateString = `${selectedYear}-${monthStr}-${dayStr}`;
    onChange(dateString);
    setModalVisible(false);
  };

  const formatDisplayDate = (valString?: string) => {
    if (!valString) return '';
    const d = new Date(valString);
    if (isNaN(d.getTime())) return valString;
    return `${d.getDate()} ${MONTHS[d.getMonth()].substring(0, 3)} ${d.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.fieldLabel}>{label}</Text>}

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.inputBox, !!error && styles.inputBoxError]}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="calendar" size={18} color={value ? '#0745E8' : '#64748B'} style={styles.icon} />
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {value ? formatDisplayDate(value) : placeholder}
        </Text>
        <Feather name="chevron-down" size={18} color="#94A3B8" />
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Sleek Centered Date Picker Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {/* Modal Header Banner */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderSub}>SELECT DATE OF BIRTH</Text>
              <View style={styles.headerDateRow}>
                <TouchableOpacity onPress={() => setViewMode('year')}>
                  <Text style={styles.headerYearText}>{selectedYear}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setViewMode('day')}>
                  <Text style={styles.headerDateText}>
                    {selectedDay} {MONTHS[selectedMonth]}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Mode Switcher Bar */}
            <View style={styles.modeBar}>
              <TouchableOpacity
                style={[styles.modeTab, viewMode === 'day' && styles.activeModeTab]}
                onPress={() => setViewMode('day')}
              >
                <Text style={viewMode === 'day' ? styles.activeModeTabText : styles.modeTabText}>
                  {MONTHS[selectedMonth]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modeTab, viewMode === 'year' && styles.activeModeTab]}
                onPress={() => setViewMode('year')}
              >
                <Text style={viewMode === 'year' ? styles.activeModeTabText : styles.modeTabText}>
                  Year ({selectedYear})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Modal Body View */}
            <View style={styles.modalBody}>
              {viewMode === 'year' && (
                <FlatList
                  data={years}
                  keyExtractor={(item) => item.toString()}
                  numColumns={3}
                  contentContainerStyle={styles.gridContainer}
                  renderItem={({ item }) => {
                    const isSelected = selectedYear === item;
                    return (
                      <TouchableOpacity
                        style={[styles.gridItem, isSelected && styles.selectedGridItem]}
                        onPress={() => {
                          setSelectedYear(item);
                          setViewMode('day');
                        }}
                      >
                        <Text style={isSelected ? styles.selectedGridItemText : styles.gridItemText}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}

              {viewMode === 'day' && (
                <View style={{ flex: 1 }}>
                  {/* Month Switcher Controls */}
                  <View style={styles.monthHeaderRow}>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))
                      }
                      style={styles.arrowBtn}
                    >
                      <Feather name="chevron-left" size={20} color="#0F172A" />
                    </TouchableOpacity>
                    <Text style={styles.monthTitleText}>
                      {MONTHS[selectedMonth]} {selectedYear}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))
                      }
                      style={styles.arrowBtn}
                    >
                      <Feather name="chevron-right" size={20} color="#0F172A" />
                    </TouchableOpacity>
                  </View>

                  {/* Day Grid */}
                  <FlatList
                    data={days}
                    keyExtractor={(item) => item.toString()}
                    numColumns={7}
                    contentContainerStyle={styles.dayGridContainer}
                    renderItem={({ item }) => {
                      const isSelected = selectedDay === item;
                      return (
                        <TouchableOpacity
                          style={[styles.dayCell, isSelected && styles.selectedDayCell]}
                          onPress={() => setSelectedDay(item)}
                        >
                          <Text style={isSelected ? styles.selectedDayCellText : styles.dayCellText}>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              )}
            </View>

            {/* Modal Actions Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                <Text style={styles.confirmBtnText}>CONFIRM DATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  inputBoxError: {
    borderColor: '#EF4444',
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  placeholderText: {
    color: '#94A3B8',
    fontWeight: '400',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    height: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    flexDirection: 'column',
  },
  modalHeader: {
    backgroundColor: '#0745E8',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalHeaderSub: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 1,
  },
  headerDateRow: {
    marginTop: 4,
  },
  headerYearText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  headerDateText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  modeBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#F8FAFC',
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeModeTab: {
    borderBottomWidth: 2.5,
    borderBottomColor: '#0745E8',
  },
  modeTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeModeTabText: {
    fontSize: 12,
    color: '#0745E8',
    fontWeight: '800',
  },
  modalBody: {
    flex: 1,
    padding: 12,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  monthTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  arrowBtn: {
    padding: 6,
  },
  dayGridContainer: {
    paddingHorizontal: 4,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 2,
  },
  selectedDayCell: {
    backgroundColor: '#0745E8',
  },
  dayCellText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  selectedDayCellText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  gridContainer: {
    paddingVertical: 8,
  },
  gridItem: {
    flex: 1,
    margin: 4,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGridItem: {
    backgroundColor: '#0745E8',
  },
  gridItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  selectedGridItemText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  confirmBtn: {
    backgroundColor: '#0745E8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  confirmBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
