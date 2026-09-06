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

interface CollegeSelectorProps {
  visible: boolean;
  selectedCollege: string;
  selectedCity: string;
  onSelect: (collegeName: string, city: string) => void;
  onClose: () => void;
}

export interface VTUCollegeItem {
  name: string;
  code: string;
  city: string;
}

export const POPULAR_VTU_COLLEGES: VTUCollegeItem[] = [
  { name: 'Sai Vidya Institute of Technology', code: 'SVIT', city: 'Bengaluru' },
  { name: 'BMS College of Engineering', code: 'BMSCE', city: 'Bengaluru' },
  { name: 'R.V. College of Engineering', code: 'RVCE', city: 'Bengaluru' },
  { name: 'MS Ramaiah Institute of Technology', code: 'MSRIT', city: 'Bengaluru' },
  { name: 'Dayananda Sagar College of Engineering', code: 'DSCE', city: 'Bengaluru' },
  { name: 'PES Institute of Technology', code: 'PESIT', city: 'Bengaluru' },
  { name: 'Siddaganga Institute of Technology', code: 'SIT', city: 'Tumakuru' },
  { name: 'NIE Institute of Technology', code: 'NIE', city: 'Mysuru' },
  { name: 'KLE Technological University', code: 'KLE', city: 'Hubballi' },
  { name: 'JSS Academy of Technical Education', code: 'JSSATE', city: 'Bengaluru' },
  { name: 'NMAM Institute of Technology', code: 'NMAMIT', city: 'Nitte / Mangaluru' },
  { name: 'VTU PG Center & Campus', code: 'VTU-HQ', city: 'Belagavi' },
];

export const CollegeSelector: React.FC<CollegeSelectorProps> = ({
  visible,
  selectedCollege,
  selectedCity,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [customName, setCustomName] = useState(selectedCollege);
  const [customCity, setCustomCity] = useState(selectedCity);

  const filteredColleges = POPULAR_VTU_COLLEGES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCollege = (col: VTUCollegeItem) => {
    onSelect(col.name, col.city);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Select VTU College</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Search Box */}
          <View style={styles.searchBox}>
            <Feather name="search" size={16} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search college name, code, or city..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />
            {search ? (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Feather name="x-circle" size={16} color="#64748B" />
              </TouchableOpacity>
            ) : null}
          </View>

          <ScrollView contentContainerStyle={styles.listWrap} showsVerticalScrollIndicator={false}>
            {filteredColleges.map((col) => {
              const isSelected = selectedCollege === col.name;
              return (
                <TouchableOpacity
                  key={col.code}
                  activeOpacity={0.8}
                  style={[styles.itemCard, isSelected && styles.itemCardSelected]}
                  onPress={() => handleSelectCollege(col)}
                >
                  <View style={styles.itemLeft}>
                    <View style={[styles.codeBadge, isSelected && styles.codeBadgeSelected]}>
                      <Text style={[styles.codeBadgeText, isSelected && styles.codeBadgeTextSelected]}>
                        {col.code}
                      </Text>
                    </View>
                    <View style={styles.itemTextGroup}>
                      <Text style={styles.itemName}>{col.name}</Text>
                      <Text style={styles.itemCity}>
                        <Feather name="map-pin" size={11} color="#64748B" /> {col.city}
                      </Text>
                    </View>
                  </View>

                  {isSelected && <Feather name="check-circle" size={18} color="#0745E8" />}
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
    maxHeight: '80%',
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
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 18,
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
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  listWrap: {
    gap: 10,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemCardSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  codeBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 12,
  },
  codeBadgeSelected: {
    backgroundColor: '#0745E8',
  },
  codeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
  },
  codeBadgeTextSelected: {
    color: '#FFFFFF',
  },
  itemTextGroup: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  itemCity: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
});
