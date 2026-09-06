import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/core/theme';

interface DocumentThumbnailProps {
  subjectCode: string;
  scheme: string;
  paperType: 'Regular' | 'Makeup' | 'Model';
  pageCount: number;
  bgAccent?: string;
  size?: 'small' | 'medium' | 'large';
}

export const DocumentThumbnail: React.FC<DocumentThumbnailProps> = ({
  subjectCode,
  scheme,
  paperType,
  pageCount,
  bgAccent = '#EEF2FF',
  size = 'medium',
}) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const width = isSmall ? 64 : isLarge ? 110 : 84;
  const height = isSmall ? 84 : isLarge ? 144 : 110;

  const getPaperTypeColor = () => {
    switch (paperType) {
      case 'Regular':
        return '#0745E8';
      case 'Makeup':
        return '#D97706';
      case 'Model':
        return '#059669';
      default:
        return '#0745E8';
    }
  };

  return (
    <View style={[styles.container, { width, height, backgroundColor: bgAccent }]}>
      {/* Top Header Strip */}
      <View style={[styles.topStrip, { backgroundColor: getPaperTypeColor() }]}>
        <Text style={styles.topStripText}>{scheme} SCHEME</Text>
      </View>

      {/* Simulated Paper Header */}
      <View style={styles.paperContent}>
        <View style={styles.usnBox}>
          <Text style={styles.usnLabel}>USN</Text>
          <View style={styles.usnGrid}>
            <View style={styles.usnCell} />
            <View style={styles.usnCell} />
            <View style={styles.usnCell} />
            <View style={styles.usnCell} />
          </View>
        </View>

        <Text style={[styles.codeText, isSmall && { fontSize: 10 }]}>{subjectCode}</Text>

        {/* Lines representing question text */}
        <View style={styles.linesGroup}>
          <View style={[styles.line, { width: '85%' }]} />
          <View style={[styles.line, { width: '95%' }]} />
          <View style={[styles.line, { width: '70%' }]} />
          <View style={[styles.line, { width: '90%' }]} />
        </View>
      </View>

      {/* Page Count Badge */}
      <View style={styles.pageBadge}>
        <Text style={styles.pageBadgeText}>{pageCount} pgs</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  topStrip: {
    paddingVertical: 3,
    alignItems: 'center',
  },
  topStripText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  paperContent: {
    padding: 6,
    flex: 1,
    justifyContent: 'center',
  },
  usnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  usnLabel: {
    fontSize: 7,
    fontWeight: '700',
    color: '#64748B',
    marginRight: 3,
  },
  usnGrid: {
    flexDirection: 'row',
    gap: 1.5,
  },
  usnCell: {
    width: 6,
    height: 7,
    borderWidth: 0.5,
    borderColor: '#94A3B8',
    borderRadius: 1,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 2,
  },
  linesGroup: {
    gap: 3,
    marginTop: 4,
  },
  line: {
    height: 2,
    backgroundColor: '#CBD5E1',
    borderRadius: 1,
  },
  pageBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  pageBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
});
