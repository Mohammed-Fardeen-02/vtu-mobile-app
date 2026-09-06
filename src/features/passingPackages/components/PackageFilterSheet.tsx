import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PackageFilterOptions, QuestionPriority } from '../types/passingPackages.types';

interface PackageFilterSheetProps {
  visible: boolean;
  filters: PackageFilterOptions;
  onClose: () => void;
  onApplyFilters: (filters: PackageFilterOptions) => void;
  onReset: () => void;
}

export const PackageFilterSheet: React.FC<PackageFilterSheetProps> = ({
  visible,
  filters,
  onClose,
  onApplyFilters,
  onReset,
}) => {
  const [localFilters, setLocalFilters] = React.useState<PackageFilterOptions>(filters);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters, visible]);

  const units = ['All', 1, 2, 3, 4, 5];
  const priorities: (QuestionPriority | 'All')[] = [
    'All',
    'Very High Priority',
    'High Priority',
    'Medium Priority',
    'Suggested Focus',
  ];
  const marksOptions = ['All', 12, 10, 8, 5];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
        
        <View style={styles.sheetContainer}>
          <View style={styles.dragHandle} />

          <View style={styles.header}>
            <Text style={styles.title}>Filter Package Questions</Text>
            <TouchableOpacity onPress={onReset}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
            {/* Filter 1: Unit Filter */}
            <Text style={styles.sectionLabel}>Select Unit</Text>
            <View style={styles.chipsRow}>
              {units.map((u) => {
                const isSelected = localFilters.selectedUnit === u;
                return (
                  <TouchableOpacity
                    key={String(u)}
                    activeOpacity={0.8}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => setLocalFilters({ ...localFilters, selectedUnit: u as any })}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {u === 'All' ? 'All Units' : `Unit ${u}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Filter 2: Priority Filter */}
            <Text style={styles.sectionLabel}>Priority Tier</Text>
            <View style={styles.chipsRow}>
              {priorities.map((p) => {
                const isSelected = localFilters.selectedPriority === p;
                return (
                  <TouchableOpacity
                    key={p}
                    activeOpacity={0.8}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => setLocalFilters({ ...localFilters, selectedPriority: p as any })}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Filter 3: Marks Filter */}
            <Text style={styles.sectionLabel}>Question Marks</Text>
            <View style={styles.chipsRow}>
              {marksOptions.map((m) => {
                const isSelected = localFilters.selectedMarks === m;
                return (
                  <TouchableOpacity
                    key={String(m)}
                    activeOpacity={0.8}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => setLocalFilters({ ...localFilters, selectedMarks: m as any })}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {m === 'All' ? 'Any Marks' : `${m} Marks`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.applyBtn}
              onPress={() => {
                onApplyFilters(localFilters);
                onClose();
              }}
            >
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 24,
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  resetText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
  body: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 10,
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  chipSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#0745E8',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  chipTextSelected: {
    color: '#0745E8',
    fontWeight: '800',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  applyBtn: {
    backgroundColor: '#0745E8',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
