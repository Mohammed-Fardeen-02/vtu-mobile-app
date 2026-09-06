import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RevisionResource } from '../types/passingPackages.types';
import { DownloadButton } from './DownloadButton';
import { BookmarkButton } from './BookmarkButton';

interface RevisionResourceCardProps {
  resource: RevisionResource;
  isDownloaded: boolean;
  isBookmarked: boolean;
  onToggleDownload: () => void;
  onToggleBookmark: () => void;
  onPress: () => void;
}

export const RevisionResourceCard: React.FC<RevisionResourceCardProps> = ({
  resource,
  isDownloaded,
  isBookmarked,
  onToggleDownload,
  onToggleBookmark,
  onPress,
}) => {
  let iconName: keyof typeof Feather.glyphMap = 'file-text';
  let iconBg = '#EEF2FF';
  let iconColor = '#0745E8';

  if (resource.type === 'Important Diagrams') {
    iconName = 'image';
    iconBg = '#ECFDF5';
    iconColor = '#059669';
  } else if (resource.type === 'Formula Sheet') {
    iconName = 'cpu';
    iconBg = '#FEF3C7';
    iconColor = '#D97706';
  } else if (resource.type === 'Key Concepts') {
    iconName = 'layers';
    iconBg = '#F3E8FF';
    iconColor = '#7C3AED';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          <Feather name={iconName} size={20} color={iconColor} />
        </View>

        <View style={styles.textWrapper}>
          <View style={styles.typeBadge}>
            <Text style={[styles.typeText, { color: iconColor }]}>{resource.type}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {resource.title}
          </Text>
        </View>

        <BookmarkButton
          isBookmarked={isBookmarked}
          onPress={onToggleBookmark}
          size={16}
        />
      </View>

      <Text style={styles.subTitle} numberOfLines={2}>
        {resource.subTitle}
      </Text>

      {resource.previewSnippet ? (
        <View style={styles.snippetBox}>
          <Text style={styles.snippetText} numberOfLines={2}>
            "{resource.previewSnippet}"
          </Text>
        </View>
      ) : null}

      <View style={styles.footerRow}>
        <View style={styles.fileMeta}>
          <Feather name="file" size={12} color="#64748B" />
          <Text style={styles.fileMetaText}>
            {resource.pageCount} Pages • {resource.fileSize}
          </Text>
        </View>

        <DownloadButton
          isDownloaded={isDownloaded}
          onPress={onToggleDownload}
          showText
          size={14}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 20,
  },
  subTitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 10,
  },
  snippetBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#0745E8',
    marginBottom: 12,
  },
  snippetText: {
    fontSize: 11,
    color: '#334155',
    fontStyle: 'italic',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  fileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  fileMetaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
});
