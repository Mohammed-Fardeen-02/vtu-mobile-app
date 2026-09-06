import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Header } from '@/shared/components';

const UNITS = ['All', 'Unit 1', 'Unit 2', 'Unit 3'];

const PDF_FILES = [
  { id: '1', title: 'Introduction', size: '1.2 MB' },
  { id: '2', title: 'Arrays and Strings', size: '1.8 MB' },
  { id: '3', title: 'Linked Lists', size: '1.6 MB' },
  { id: '4', title: 'Stacks', size: '1.3 MB' },
  { id: '5', title: 'Queues', size: '1.4 MB' },
];

export const NoteDetailScreen: React.FC = () => {
  const router = useRouter();
  const [activeUnit, setActiveUnit] = useState('All');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Notes" showBack />
      <View style={styles.container}>
        {/* Unit Filter Pills */}
        <View style={styles.filterRow}>
          {UNITS.map((unit) => (
            <TouchableOpacity
              key={unit}
              style={[styles.tagPill, activeUnit === unit && styles.activeTagPill]}
              onPress={() => setActiveUnit(unit)}
            >
              <Text style={[styles.tagText, activeUnit === unit && styles.activeTagText]}>
                {unit}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PDF File List */}
        <FlatList
          data={PDF_FILES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.fileCard}
              onPress={() => router.push(`/notes/${item.id}?view=reader`)}
            >
              <View style={styles.iconBox}>
                <Feather name="file-text" size={22} color="#EF4444" />
              </View>
              <View style={styles.fileInfo}>
                <Text style={styles.fileTitle}>{item.title}</Text>
                <Text style={styles.fileSub}>PDF • {item.size}</Text>
              </View>
              <TouchableOpacity style={styles.menuBtn}>
                <Feather name="more-vertical" size={18} color="#94A3B8" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  tagPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  activeTagPill: {
    backgroundColor: '#0745E8',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTagText: {
    color: '#FFFFFF',
  },
  listContainer: {
    gap: 12,
    paddingBottom: 40,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  fileInfo: {
    flex: 1,
  },
  fileTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  fileSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  menuBtn: {
    padding: 4,
  },
});
