import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { QuestionPaper } from '../types/paper.types';
import { usePaperStore } from '../store/usePaperStore';

interface DownloadProgressModalProps {
  paper: QuestionPaper | null;
  visible: boolean;
  onClose: () => void;
  onViewOffline?: (paper: QuestionPaper) => void;
}

export const DownloadProgressModal: React.FC<DownloadProgressModalProps> = ({
  paper,
  visible,
  onClose,
  onViewOffline,
}) => {
  const downloadProgressMap = usePaperStore((state) => state.downloadProgressMap);

  if (!paper) return null;

  const downloadState = downloadProgressMap[paper.id];
  const progress = downloadState?.progress || 0;
  const isCompleted = downloadState?.isCompleted || progress >= 100;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.cardContainer}>
          {/* Top Status Icon */}
          <View
            style={[
              styles.iconCircle,
              isCompleted ? styles.iconCircleCompleted : styles.iconCircleDownloading,
            ]}
          >
            <Feather
              name={isCompleted ? 'check' : 'arrow-down'}
              size={28}
              color={isCompleted ? '#059669' : '#0745E8'}
            />
          </View>

          <Text style={styles.statusTitle}>
            {isCompleted ? 'Paper Saved Offline!' : 'Downloading Question Paper'}
          </Text>

          <Text style={styles.subjectName}>{paper.subjectName}</Text>
          <Text style={styles.paperMeta}>
            {paper.subjectCode} • {paper.scheme} Scheme • {paper.year} ({paper.paperType})
          </Text>

          {/* Progress Bar Container */}
          <View style={styles.progressSection}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            <View style={styles.progressInfoRow}>
              <Text style={styles.percentageText}>{progress}% Completed</Text>
              <Text style={styles.sizeText}>
                {Math.round((progress / 100) * 2.4 * 10) / 10} MB / {paper.fileSize}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            {isCompleted ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.secondaryBtn}
                  onPress={onClose}
                >
                  <Text style={styles.secondaryBtnText}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.primaryBtn}
                  onPress={() => {
                    onClose();
                    if (onViewOffline) onViewOffline(paper);
                  }}
                >
                  <Feather name="book-open" size={16} color="#FFFFFF" />
                  <Text style={styles.primaryBtnText}>View Offline</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.cancelBtn}
                onPress={onClose}
              >
                <Text style={styles.cancelBtnText}>Run in Background</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconCircleDownloading: {
    backgroundColor: '#EEF2FF',
  },
  iconCircleCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    textAlign: 'center',
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0745E8',
    textAlign: 'center',
  },
  paperMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 20,
    textAlign: 'center',
  },
  progressSection: {
    width: '100%',
    marginBottom: 24,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0745E8',
    borderRadius: 4,
  },
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  sizeText: {
    fontSize: 12,
    color: '#64748B',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  primaryBtn: {
    flex: 1,
    height: 46,
    backgroundColor: '#0745E8',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryBtn: {
    flex: 1,
    height: 46,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },
  cancelBtn: {
    width: '100%',
    height: 46,
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },
});
