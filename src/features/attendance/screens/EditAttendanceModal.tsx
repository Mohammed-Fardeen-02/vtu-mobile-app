import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAttendanceStore } from '../store/useAttendanceStore';
import { SubjectAttendance } from '../types/attendance.types';
import { AttendanceInput } from '../components/AttendanceInput';
import { TargetAttendanceSelector } from '../components/TargetAttendanceSelector';

interface EditAttendanceModalProps {
  visible: boolean;
  subject: SubjectAttendance;
  onClose: () => void;
}

export const EditAttendanceModal: React.FC<EditAttendanceModalProps> = ({
  visible,
  subject,
  onClose,
}) => {
  const updateAttendance = useAttendanceStore((state) => state.updateAttendance);

  const [attended, setAttended] = useState(subject?.attendedClasses || 0);
  const [conducted, setConducted] = useState(subject?.conductedClasses || 0);
  const [target, setTarget] = useState(subject?.targetAttendance || 85);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (subject) {
      setAttended(subject.attendedClasses);
      setConducted(subject.conductedClasses);
      setTarget(subject.targetAttendance);
    }
  }, [subject]);

  if (!subject) return null;

  const projPct = conducted > 0 ? (attended / conducted) * 100 : 0;

  const handleSave = () => {
    if (attended > conducted) {
      setError('Attended classes cannot exceed total conducted classes.');
      return;
    }

    setError(null);
    updateAttendance(subject.id, attended, conducted);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <View>
              <Text style={styles.headerTitle}>Edit Subject Attendance</Text>
              <Text style={styles.headerSub}>
                {subject.subjectCode} • {subject.subjectName}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Live Percentage Feedback Preview */}
            <View style={styles.previewBox}>
              <Text style={styles.previewLabel}>PROJECTED ATTENDANCE</Text>
              <Text style={styles.previewPct}>{projPct.toFixed(1)}%</Text>
              <Text style={styles.previewSub}>
                {attended} / {conducted} Classes Attended
              </Text>
            </View>

            <AttendanceInput
              label="Conducted Classes"
              subText="Total lectures delivered"
              value={conducted}
              onChangeValue={(v) => {
                setConducted(v);
                if (attended > v) setAttended(v);
              }}
              min={0}
            />

            <AttendanceInput
              label="Attended Classes"
              subText="Lectures you were present"
              value={attended}
              onChangeValue={(v) => {
                if (v <= conducted) setAttended(v);
              }}
              min={0}
            />

            <TargetAttendanceSelector selectedTarget={target} onSelectTarget={setTarget} />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity activeOpacity={0.9} style={styles.saveBtn} onPress={handleSave}>
              <Feather name="check" size={18} color="#FFFFFF" />
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
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
    maxHeight: '85%',
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
  headerSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBox: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  previewLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  previewPct: {
    fontSize: 36,
    fontWeight: '900',
    color: '#0F172A',
    marginVertical: 4,
  },
  previewSub: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0745E8',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 10,
  },
  saveBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#0745E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
