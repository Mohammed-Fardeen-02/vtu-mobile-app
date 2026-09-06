import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AcademicData } from '../types/goalPlanner.types';

interface AcademicDataCardProps {
  data: AcademicData;
  onSyncPress: () => void;
  onEditPress: () => void;
}

export const AcademicDataCard: React.FC<AcademicDataCardProps> = ({
  data,
  onSyncPress,
  onEditPress,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.headerTitle}>Current Academic Profile</Text>
          <Text style={styles.headerSub}>Synced with Student Profile & GPA Calculator</Text>
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.syncBtn} onPress={onSyncPress}>
          <Feather name="refresh-cw" size={14} color="#0745E8" />
          <Text style={styles.syncBtnText}>Sync Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dataRow}>
        <View style={styles.tile}>
          <Text style={styles.valText}>{data.currentCgpa.toFixed(2)}</Text>
          <Text style={styles.lblText}>Current CGPA</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.tile}>
          <Text style={styles.valText}>{data.completedSemesters}</Text>
          <Text style={styles.lblText}>Semesters Completed</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.tile}>
          <Text style={styles.valText}>Sem {data.currentSemester}</Text>
          <Text style={styles.lblText}>Enrolled Semester</Text>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.8} style={styles.editBtn} onPress={onEditPress}>
        <Feather name="edit-2" size={14} color="#64748B" />
        <Text style={styles.editBtnText}>Edit Academic Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  titleGroup: {
    flex: 1,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  syncBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0745E8',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  tile: {
    flex: 1,
    alignItems: 'center',
  },
  valText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  lblText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
});
