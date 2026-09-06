import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SubjectAttendance } from '../types/attendance.types';

interface SubjectSelectorProps {
  visible: boolean;
  subjects: SubjectAttendance[];
  selectedSubjectId: string | null;
  onSelect: (subject: SubjectAttendance) => void;
  onClose: () => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  visible,
  subjects,
  selectedSubjectId,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  const filtered = subjects.filter(
    (s) =>
      s.subjectName.toLowerCase().includes(search.toLowerCase()) ||
      s.subjectCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Select Subject</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={styles.searchBox}>
            <Feather name="search" size={16} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search subject by code or name..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView style={styles.listScroll} showsVerticalScrollIndicator={false}>
            {filtered.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              const percentage =
                sub.conductedClasses > 0
                  ? Math.round((sub.attendedClasses / sub.conductedClasses) * 100)
                  : 0;

              return (
                <TouchableOpacity
                  key={sub.id}
                  activeOpacity={0.8}
                  style={[styles.itemRow, isSelected && styles.itemRowSelected]}
                  onPress={() => {
                    onSelect(sub);
                    onClose();
                  }}
                >
                  <View style={styles.itemTextCol}>
                    <Text style={styles.codeText}>{sub.subjectCode}</Text>
                    <Text style={styles.nameText}>{sub.subjectName}</Text>
                  </View>

                  <View style={styles.rightCol}>
                    <Text style={styles.pctText}>{percentage}%</Text>
                    {isSelected && <Feather name="check-circle" size={18} color="#0745E8" />}
                  </View>
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
    maxHeight: '75%',
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 24,
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
    marginBottom: 12,
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  listScroll: {
    maxHeight: 300,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemRowSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  itemTextCol: {
    flex: 1,
    marginRight: 10,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0745E8',
  },
  nameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pctText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
});
