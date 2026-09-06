import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ReportBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSubmitReport: (reason: string, details: string) => void;
}

export const ReportBottomSheet: React.FC<ReportBottomSheetProps> = ({
  visible,
  onClose,
  onSubmitReport,
}) => {
  const [selectedReason, setSelectedReason] = useState('Inaccurate Syllabus Content');
  const [details, setDetails] = useState('');

  const reasons = [
    'Inaccurate Syllabus Content',
    'Copyright Violation / Duplicate',
    'Blurry or Unreadable Handwriting',
    'Wrong Subject or Scheme Code',
    'Spam or Irrelevant Document',
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

        <View style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <Feather name="flag" size={20} color="#EF4444" />
            <Text style={styles.title}>Report Community Content</Text>
          </View>

          <Text style={styles.subtitle}>
            Help maintain high quality standards across VTU Student Community.
          </Text>

          {reasons.map((r) => {
            const isSelected = selectedReason === r;
            return (
              <TouchableOpacity
                key={r}
                activeOpacity={0.8}
                style={[styles.reasonTile, isSelected && styles.reasonSelected]}
                onPress={() => setSelectedReason(r)}
              >
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text style={[styles.reasonText, isSelected && styles.reasonTextSelected]}>{r}</Text>
              </TouchableOpacity>
            );
          })}

          <Text style={styles.label}>Additional Details (Optional)</Text>
          <TextInput
            style={styles.input}
            value={details}
            onChangeText={setDetails}
            placeholder="Describe specific page numbers or content errors..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.submitBtn}
            onPress={() => {
              onSubmitReport(selectedReason, details);
              onClose();
            }}
          >
            <Text style={styles.submitBtnText}>Submit Moderation Report</Text>
          </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 30,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  reasonTile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    marginBottom: 8,
  },
  reasonSelected: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#EF4444',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  reasonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  reasonTextSelected: {
    color: '#991B1B',
    fontWeight: '800',
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    marginTop: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    fontSize: 13,
    color: '#0F172A',
    height: 70,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  submitBtn: {
    backgroundColor: '#EF4444',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
