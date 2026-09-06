import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const QuickAccessGrid: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/library')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {/* Notes Tile */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tile, { backgroundColor: '#EFF6FF' }]}
          onPress={() => router.push('/(tabs)/library')}
        >
          <View style={[styles.tileIconBox, { backgroundColor: '#3B82F6' }]}>
            <Feather name="book-open" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextWrapper}>
            <Text style={styles.tileTitle}>Notes</Text>
            <Text style={styles.tileSub}>Module PDFs</Text>
          </View>
        </TouchableOpacity>

        {/* Previous Year Papers Tile */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tile, { backgroundColor: '#F3E8FF' }]}
          onPress={() => router.push('/papers')}
        >
          <View style={[styles.tileIconBox, { backgroundColor: '#A855F7' }]}>
            <Feather name="file-text" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextWrapper}>
            <Text style={styles.tileTitle}>Papers</Text>
            <Text style={styles.tileSub}>VTU QPs</Text>
          </View>
        </TouchableOpacity>

        {/* Passing Packages Tile */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tile, { backgroundColor: '#FEF2F2' }]}
          onPress={() => router.push('/passing-packages' as any)}
        >
          <View style={[styles.tileIconBox, { backgroundColor: '#DC2626' }]}>
            <Feather name="zap" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextWrapper}>
            <Text style={styles.tileTitle}>Passing Packs</Text>
            <Text style={styles.tileSub}>Exam Focus</Text>
          </View>
        </TouchableOpacity>

        {/* Calculators Tile */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tile, { backgroundColor: '#ECFDF5' }]}
          onPress={() => router.push('/(tabs)/tools')}
        >
          <View style={[styles.tileIconBox, { backgroundColor: '#10B981' }]}>
            <Feather name="cpu" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextWrapper}>
            <Text style={styles.tileTitle}>Calculators</Text>
            <Text style={styles.tileSub}>SGPA & CGPA</Text>
          </View>
        </TouchableOpacity>

        {/* Academic Calendar Tile */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tile, { backgroundColor: '#EEF2FF' }]}
          onPress={() => router.push('/calendar' as any)}
        >
          <View style={[styles.tileIconBox, { backgroundColor: '#0745E8' }]}>
            <Feather name="calendar" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextWrapper}>
            <Text style={styles.tileTitle}>Calendar</Text>
            <Text style={styles.tileSub}>Exams & Dates</Text>
          </View>
        </TouchableOpacity>

        {/* Saved & Offline Tile */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.tile, { backgroundColor: '#FFF7ED' }]}
          onPress={() => router.push('/saved' as any)}
        >
          <View style={[styles.tileIconBox, { backgroundColor: '#F97316' }]}>
            <Feather name="bookmark" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextWrapper}>
            <Text style={styles.tileTitle}>Saved</Text>
            <Text style={styles.tileSub}>Offline Hub</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: '48%',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
  },
  tileIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tileTextWrapper: {
    flex: 1,
  },
  tileTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  tileSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
});
