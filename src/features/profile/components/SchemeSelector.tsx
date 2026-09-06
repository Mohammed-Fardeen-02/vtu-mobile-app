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
import { SchemeOption } from '../types/profile.types';

interface SchemeSelectorProps {
  visible: boolean;
  selectedScheme: string;
  onSelect: (scheme: string) => void;
  onClose: () => void;
}

const SCHEMES: SchemeOption[] = [
  { code: '2022', yearName: '2022 Scheme', description: 'NEP 2020 Aligned Credit Based System' },
  { code: '2021', yearName: '2021 Scheme', description: 'Outcome Based Education (OBE) Curriculum' },
  { code: '2018', yearName: '2018 Scheme', description: 'Choice Based Credit System (CBCS)' },
  { code: '2017', yearName: '2017 Scheme', description: 'Legacy CBCS Curriculum' },
];

export const SchemeSelector: React.FC<SchemeSelectorProps> = ({
  visible,
  selectedScheme,
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
            <Text style={styles.headerTitle}>Select Curriculum Scheme</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.listWrap} showsVerticalScrollIndicator={false}>
            {SCHEMES.map((sch) => {
              const isSelected = selectedScheme === sch.code;
              return (
                <TouchableOpacity
                  key={sch.code}
                  activeOpacity={0.8}
                  style={[styles.schemeCard, isSelected && styles.schemeCardSelected]}
                  onPress={() => {
                    onSelect(sch.code);
                    onClose();
                  }}
                >
                  <View style={styles.textCol}>
                    <Text style={[styles.schemeTitle, isSelected && styles.schemeTitleSelected]}>
                      {sch.yearName}
                    </Text>
                    <Text style={styles.schemeDesc}>{sch.description}</Text>
                  </View>

                  {isSelected && <Feather name="check-circle" size={20} color="#0745E8" />}
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
  listWrap: {
    gap: 10,
  },
  schemeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  schemeCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#0745E8',
  },
  textCol: {
    flex: 1,
    marginRight: 10,
  },
  schemeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  schemeTitleSelected: {
    color: '#0745E8',
  },
  schemeDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});
