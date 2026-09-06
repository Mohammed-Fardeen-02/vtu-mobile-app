import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CommunityFilterOptions, ResourceType } from '../types/community.types';

interface CommunityFilterSheetProps {
  visible: boolean;
  filters: CommunityFilterOptions;
  onClose: () => void;
  onApplyFilters: (filters: CommunityFilterOptions) => void;
  onReset: () => void;
}

export const CommunityFilterSheet: React.FC<CommunityFilterSheetProps> = ({
  visible,
  filters,
  onClose,
  onApplyFilters,
  onReset,
}) => {
  const [local, setLocal] = useState<CommunityFilterOptions>(filters);

  useEffect(() => {
    setLocal(filters);
  }, [filters, visible]);

  const sortOptions: CommunityFilterOptions['sortBy'][] = [
    'Most Popular',
    'Highest Rated',
    'Most Useful',
    'Recently Uploaded',
  ];

  const branches = ['All', 'CSE', 'ISE', 'ECE', 'EEE', 'ME', 'CIV'];
  const semesters = ['All', 1, 2, 3, 4, 5, 6, 7, 8];
  const units = ['All', 1, 2, 3, 4, 5];
  const resourceTypes: (ResourceType | 'All')[] = [
    'All',
    'Handwritten Notes',
    'Formula Sheet',
    'Solved Question Bank',
    'Typed PDF',
    'Lab Record',
    'Revision Mindmap',
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>Community Filters & Sorting</Text>
            <TouchableOpacity onPress={onReset}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
            {/* Sort By */}
            <Text style={styles.sectionLabel}>Sort By</Text>
            <View style={styles.chipsRow}>
              {sortOptions.map((s) => {
                const isSel = local.sortBy === s;
                return (
                  <TouchableOpacity
                    key={s}
                    style={[styles.chip, isSel && styles.chipSel]}
                    onPress={() => setLocal({ ...local, sortBy: s })}
                  >
                    <Text style={[styles.chipText, isSel && styles.chipTextSel]}>{s}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Branch */}
            <Text style={styles.sectionLabel}>Branch</Text>
            <View style={styles.chipsRow}>
              {branches.map((b) => {
                const isSel = local.selectedBranch === b;
                return (
                  <TouchableOpacity
                    key={b}
                    style={[styles.chip, isSel && styles.chipSel]}
                    onPress={() => setLocal({ ...local, selectedBranch: b as any })}
                  >
                    <Text style={[styles.chipText, isSel && styles.chipTextSel]}>{b}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Semester */}
            <Text style={styles.sectionLabel}>Semester</Text>
            <View style={styles.chipsRow}>
              {semesters.map((s) => {
                const isSel = local.selectedSemester === s;
                return (
                  <TouchableOpacity
                    key={String(s)}
                    style={[styles.chip, isSel && styles.chipSel]}
                    onPress={() => setLocal({ ...local, selectedSemester: s as any })}
                  >
                    <Text style={[styles.chipText, isSel && styles.chipTextSel]}>
                      {s === 'All' ? 'All Semesters' : `Sem ${s}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Unit */}
            <Text style={styles.sectionLabel}>Unit / Module</Text>
            <View style={styles.chipsRow}>
              {units.map((u) => {
                const isSel = local.selectedUnit === u;
                return (
                  <TouchableOpacity
                    key={String(u)}
                    style={[styles.chip, isSel && styles.chipSel]}
                    onPress={() => setLocal({ ...local, selectedUnit: u as any })}
                  >
                    <Text style={[styles.chipText, isSel && styles.chipTextSel]}>
                      {u === 'All' ? 'All Units' : `Unit ${u}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Resource Type */}
            <Text style={styles.sectionLabel}>Resource Category</Text>
            <View style={styles.chipsRow}>
              {resourceTypes.map((rt) => {
                const isSel = local.selectedResourceType === rt;
                return (
                  <TouchableOpacity
                    key={rt}
                    style={[styles.chip, isSel && styles.chipSel]}
                    onPress={() => setLocal({ ...local, selectedResourceType: rt as any })}
                  >
                    <Text style={[styles.chipText, isSel && styles.chipTextSel]}>{rt}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => {
                onApplyFilters(local);
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
  backdrop: { flex: 1 },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '82%',
    paddingBottom: 24,
  },
  handle: {
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
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 8,
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
    paddingVertical: 6,
    borderRadius: 18,
  },
  chipSel: {
    backgroundColor: '#EEF2FF',
    borderColor: '#0745E8',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  chipTextSel: {
    color: '#0745E8',
    fontWeight: '800',
  },
  footer: {
    paddingHorizontal: 20,
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
