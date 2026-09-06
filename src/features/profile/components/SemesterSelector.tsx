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

interface SemesterSelectorProps {
  visible: boolean;
  selectedSemester: number;
  onSelect: (semester: number) => void;
  onClose: () => void;
}

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const SemesterSelector: React.FC<SemesterSelectorProps> = ({
  visible,
  selectedSemester,
  onSelect,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Select Active Semester</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.gridWrap} showsVerticalScrollIndicator={false}>
            {SEMESTERS.map((sem) => {
              const isSelected = selectedSemester === sem;
              return (
                <TouchableOpacity
                  key={sem}
                  activeOpacity={0.8}
                  style={[styles.semTile, isSelected && styles.semTileSelected]}
                  onPress={() => {
                    onSelect(sem);
                    onClose();
                  }}
                >
                  <Text style={[styles.semNum, isSelected && styles.semNumSelected]}>
                    Sem {sem}
                  </Text>
                  <Text style={styles.semSub}>
                    {sem <= 2 ? 'First Year' : sem <= 4 ? 'Second Year' : sem <= 6 ? 'Third Year' : 'Final Year'}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <Feather name="check" size={12} color="#FFFFFF" />
                    </View>
                  )}
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
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  semTile: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  semTileSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#0745E8',
  },
  semNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  semNumSelected: {
    color: '#0745E8',
  },
  semSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0745E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
