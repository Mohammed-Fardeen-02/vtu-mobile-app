import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { usePaperStore } from '../store/usePaperStore';
import {
  SCHEMES_LIST,
  BRANCHES_LIST,
  SEMESTERS_LIST,
  YEARS_LIST,
  PAPER_TYPES_LIST,
} from '../api/mockPapers';
import { useAuthStore } from '@/store';

interface PaperFilterSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const PaperFilterSheet: React.FC<PaperFilterSheetProps> = ({
  visible,
  onClose,
}) => {
  const user = useAuthStore((state) => state.user);
  const { activeFilters, setFilters, resetFilters, getFilteredPapers } = usePaperStore();

  const filteredCount = getFilteredPapers().length;

  const renderSectionHeader = (title: string, currentVal: string) => (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {currentVal !== 'All' && (
        <View style={styles.activeTag}>
          <Text style={styles.activeTagText}>{currentVal}</Text>
        </View>
      )}
    </View>
  );

  const renderChipGroup = (
    items: string[],
    selectedVal: string,
    onSelect: (val: string) => void,
    prefix: string = ''
  ) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipsScroll}
    >
      {items.map((item) => {
        const isSelected = selectedVal === item;
        const displayLabel = item === 'All' ? 'All' : `${prefix}${item}`;
        return (
          <TouchableOpacity
            key={item}
            activeOpacity={0.8}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(item)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {displayLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Sheet Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.headerTitle}>Filter Question Papers</Text>
              <Text style={styles.headerSub}>Refine by Scheme, Branch, Year & Exam Type</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            {/* Paper Type Filter */}
            {renderSectionHeader('Paper Type', activeFilters.paperType)}
            {renderChipGroup(PAPER_TYPES_LIST, activeFilters.paperType, (val) =>
              setFilters({ paperType: val })
            )}

            {/* Scheme Filter */}
            {renderSectionHeader('Curriculum Scheme', activeFilters.scheme)}
            {renderChipGroup(SCHEMES_LIST, activeFilters.scheme, (val) =>
              setFilters({ scheme: val })
            )}

            {/* Branch Filter */}
            {renderSectionHeader('Engineering Branch', activeFilters.branch)}
            {renderChipGroup(BRANCHES_LIST, activeFilters.branch, (val) =>
              setFilters({ branch: val })
            )}

            {/* Semester Filter */}
            {renderSectionHeader('Semester', activeFilters.semester)}
            {renderChipGroup(
              SEMESTERS_LIST,
              activeFilters.semester,
              (val) => setFilters({ semester: val }),
              'Sem '
            )}

            {/* Exam Year Filter */}
            {renderSectionHeader('Exam Year', activeFilters.year)}
            {renderChipGroup(YEARS_LIST, activeFilters.year, (val) =>
              setFilters({ year: val })
            )}
          </ScrollView>

          {/* Sheet Footer Actions */}
          <SafeAreaView edges={['bottom']} style={styles.footerSafeArea}>
            <View style={styles.footerRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.resetBtn}
                onPress={() => resetFilters(user || undefined)}
              >
                <Text style={styles.resetBtnText}>Reset Defaults</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.applyBtn}
                onPress={onClose}
              >
                <Text style={styles.applyBtnText}>
                  Show Results ({filteredCount})
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
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
    maxHeight: '85%',
    paddingTop: 12,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollBody: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },
  activeTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  activeTagText: {
    color: '#0745E8',
    fontSize: 11,
    fontWeight: '700',
  },
  chipsScroll: {
    gap: 8,
    paddingBottom: 6,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipSelected: {
    backgroundColor: '#0745E8',
    borderColor: '#0745E8',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footerSafeArea: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  resetBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  applyBtn: {
    flex: 2,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0745E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
