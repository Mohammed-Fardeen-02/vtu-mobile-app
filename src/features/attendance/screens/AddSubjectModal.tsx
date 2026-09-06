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
import { useAttendanceStore } from '../store/useAttendanceStore';
import { AttendanceInput } from '../components/AttendanceInput';
import { TargetAttendanceSelector } from '../components/TargetAttendanceSelector';

interface AddSubjectModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  visible,
  onClose,
}) => {
  const addSubject = useAttendanceStore((state) => state.addSubject);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [attended, setAttended] = useState(20);
  const [conducted, setConducted] = useState(24);
  const [target, setTarget] = useState(85);

  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    if (!name.trim()) {
      setError('Please enter a subject name.');
      return;
    }
    if (attended > conducted) {
      setError('Attended classes cannot be greater than conducted classes.');
      return;
    }

    setError(null);
    addSubject({
      subjectName: name.trim(),
      subjectCode: code.trim().toUpperCase() || '21CS5X',
      attendedClasses: attended,
      conductedClasses: conducted,
      targetAttendance: target,
      iconName: 'book',
      iconBg: '#EEF2FF',
    });

    // Reset & close
    setName('');
    setCode('');
    setAttended(20);
    setConducted(24);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Add Enrolled Subject</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Subject Name Input */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Subject Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Compiler Design"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={(t) => {
                  setName(t);
                  if (error) setError(null);
                }}
              />
            </View>

            {/* Subject Code Input */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Subject Code (Optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 21CS55"
                placeholderTextColor="#94A3B8"
                value={code}
                onChangeText={setCode}
                autoCapitalize="characters"
              />
            </View>

            {/* Conducted Classes Stepper */}
            <AttendanceInput
              label="Total Conducted Classes"
              subText="Total lectures delivered so far"
              value={conducted}
              onChangeValue={(v) => {
                setConducted(v);
                if (attended > v) setAttended(v);
              }}
              min={0}
            />

            {/* Attended Classes Stepper */}
            <AttendanceInput
              label="Classes You Attended"
              subText="Total lectures you were present"
              value={attended}
              onChangeValue={(v) => {
                if (v <= conducted) setAttended(v);
              }}
              min={0}
            />

            {/* Target Selector */}
            <TargetAttendanceSelector selectedTarget={target} onSelectTarget={setTarget} />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity activeOpacity={0.9} style={styles.submitBtn} onPress={handleAdd}>
              <Feather name="check" size={18} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>Add Subject</Text>
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
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldSection: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  textInput: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 10,
  },
  submitBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#0745E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
