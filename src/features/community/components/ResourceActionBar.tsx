import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DownloadButton } from '@/features/passingPackages/components/DownloadButton';
import { BookmarkButton } from '@/features/passingPackages/components/BookmarkButton';

interface ResourceActionBarProps {
  isDownloaded: boolean;
  isBookmarked: boolean;
  onToggleDownload: () => void;
  onToggleBookmark: () => void;
  onPressReadNotes: () => void;
  onPressReport: () => void;
}

export const ResourceActionBar: React.FC<ResourceActionBarProps> = ({
  isDownloaded,
  isBookmarked,
  onToggleDownload,
  onToggleBookmark,
  onPressReadNotes,
  onPressReport,
}) => {
  return (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.iconActionBtn} onPress={onPressReport}>
        <Feather name="flag" size={18} color="#EF4444" />
      </TouchableOpacity>

      <BookmarkButton
        isBookmarked={isBookmarked}
        onPress={onToggleBookmark}
        size={18}
      />

      <DownloadButton
        isDownloaded={isDownloaded}
        onPress={onToggleDownload}
        size={18}
      />

      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.readBtn}
        onPress={onPressReadNotes}
      >
        <Feather name="book-open" size={16} color="#FFFFFF" />
        <Text style={styles.readBtnText}>Read Full Notes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 5,
  },
  iconActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  readBtn: {
    flex: 1,
    backgroundColor: '#0745E8',
    borderRadius: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  readBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
