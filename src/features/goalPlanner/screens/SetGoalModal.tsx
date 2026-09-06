import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'expo-router';
import { useGoalPlannerStore } from '../store/useGoalPlannerStore';
import { GoalPresetChips } from '../components/GoalPresetChips';

interface SetGoalModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SetGoalModal: React.FC<SetGoalModalProps> = ({
  visible,
  onClose,
}) => {
  const router = useRouter();
  const { academicData, setAcademicData, calculateGoal } = useGoalPlannerStore();

  const [targetText, setTargetText] = useState('8.50');
  const [currentCgpaText, setCurrentCgpaText] = useState(String(academicData.currentCgpa));
  const [completedSems, setCompletedSems] = useState(academicData.completedSemesters);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentCgpaText(String(academicData.currentCgpa));
    setCompletedSems(academicData.completedSemesters);
  }, [academicData]);

  const handleCalculate = () => {
    const targetVal = parseFloat(targetText);
    const cgpaVal = parseFloat(currentCgpaText);

    if (isNaN(targetVal) || targetVal < 0 || targetVal > 10) {
      setError('Target CGPA must be a valid number between 0.00 and 10.00.');
      return;
    }

    if (isNaN(cgpaVal) || cgpaVal < 0 || cgpaVal > 10) {
      setError('Current CGPA must be a valid number between 0.00 and 10.00.');
      return;
    }

    setError(null);
    setAcademicData({
      currentCgpa: cgpaVal,
      completedSemesters: completedSems,
      currentSemester: completedSems + 1,
    });

    calculateGoal(targetVal);
    onClose();

    router.push('/calculators/goal-planner/result' as any);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Plan Target Graduation CGPA</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Target CGPA Input */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Target CGPA Goal</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  placeholder="e.g. 8.50"
                  placeholderTextColor="#94A3B8"
                  value={targetText}
                  onChangeText={(t) => {
                    setTargetText(t);
                    if (error) setError(null);
                  }}
                  maxLength={5}
                />
                <Text style={styles.scaleText}>/ 10.00</Text>
              </View>
            </View>

            {/* Presets Chips */}
            <GoalPresetChips
              selectedTarget={parseFloat(targetText) || 8.50}
              onSelectTarget={(t) => setTargetText(t.toFixed(2))}
            />

            {/* Current CGPA Edit Input */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Current CGPA</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  value={currentCgpaText}
                  onChangeText={setCurrentCgpaText}
                  maxLength={5}
                />
                <Text style={styles.scaleText}>/ 10.00</Text>
              </View>
            </View>

            {/* Completed Semesters Stepper */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Completed Semesters</Text>
              <View style={styles.semStepperRow}>
                {[1, 2, 3, 4, 5, 6, 7].map((s) => {
                  const isSel = completedSems === s;
                  return (
                    <TouchableOpacity
                      key={s}
                      activeOpacity={0.8}
                      style={[styles.semChip, isSel && styles.semChipActive]}
                      onPress={() => setCompletedSems(s)}
                    >
                      <Text style={[styles.semChipText, isSel && styles.semChipTextActive]}>
                        Sem {s}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity activeOpacity={0.9} style={styles.calcBtn} onPress={handleCalculate}>
              <Feather name="cpu" size={18} color="#FFFFFF" />
              <Text style={styles.calcBtnText}>Calculate Required SGPA Roadmap</Text>
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
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  scaleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  semStepperRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  semChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  semChipActive: {
    backgroundColor: '#0745E8',
    borderColor: '#0745E8',
  },
  semChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  semChipTextActive: {
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 10,
  },
  calcBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#0745E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  calcBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
