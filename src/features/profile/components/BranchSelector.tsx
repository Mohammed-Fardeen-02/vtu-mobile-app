import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BranchOption } from '../types/profile.types';

interface BranchSelectorProps {
  visible: boolean;
  selectedBranch: string;
  onSelect: (branchCode: string) => void;
  onClose: () => void;
}

const BRANCHES: BranchOption[] = [
  { code: 'CSE', name: 'Computer Science & Engineering' },
  { code: 'ISE', name: 'Information Science & Engineering' },
  { code: 'ECE', name: 'Electronics & Communication Engg' },
  { code: 'EEE', name: 'Electrical & Electronics Engineering' },
  { code: 'ME', name: 'Mechanical Engineering' },
  { code: 'CIV', name: 'Civil Engineering' },
  { code: 'AIML', name: 'AI & Machine Learning' },
  { code: 'DS', name: 'Data Science & Analytics' },
];

export const BranchSelector: React.FC<BranchSelectorProps> = ({
  visible,
  selectedBranch,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState('');

  const filtered = BRANCHES.filter(
    (b) =>
      b.code.toLowerCase().includes(search.toLowerCase()) ||
      b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Select Engineering Branch</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Search Box */}
          <View style={styles.searchBox}>
            <Feather name="search" size={16} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search branch code or full name..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView style={styles.listScroll} showsVerticalScrollIndicator={false}>
            {filtered.map((item) => {
              const isSelected = selectedBranch === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  activeOpacity={0.8}
                  style={[styles.itemRow, isSelected && styles.itemRowSelected]}
                  onPress={() => {
                    onSelect(item.code);
                    onClose();
                  }}
                >
                  <View style={styles.itemTextCol}>
                    <Text style={[styles.codeText, isSelected && styles.codeTextSelected]}>
                      {item.code}
                    </Text>
                    <Text style={styles.nameText}>{item.name}</Text>
                  </View>

                  {isSelected && <Feather name="check" size={18} color="#0745E8" />}
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
    paddingBottom: 20,
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
    maxHeight: 320,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 6,
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
  },
  codeText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  codeTextSelected: {
    color: '#0745E8',
  },
  nameText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
});
