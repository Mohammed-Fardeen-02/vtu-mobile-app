import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SavedItem } from '../types/saved.types';
import { useSavedStore } from '../store/useSavedStore';

interface SavedItemCardProps {
  item: SavedItem;
  onOpenOffline: (item: SavedItem) => void;
}

export const SavedItemCard: React.FC<SavedItemCardProps> = ({
  item,
  onOpenOffline,
}) => {
  const { toggleBookmark, toggleDownload } = useSavedStore();

  const isNote = item.type === 'Note';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => onOpenOffline(item)}
    >
      <View style={styles.topRow}>
        {/* Type Icon Badge Box */}
        <View
          style={[
            styles.iconBox,
            { backgroundColor: isNote ? '#F3E8FF' : '#EEF2FF' },
          ]}
        >
          <Feather
            name={isNote ? 'book-open' : 'file-text'}
            size={22}
            color={isNote ? '#9333EA' : '#0745E8'}
          />
        </View>

        {/* Details Wrapper */}
        <View style={styles.infoWrapper}>
          <View style={styles.badgeRow}>
            {/* Category Badge */}
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: isNote ? '#F3E8FF' : '#EEF2FF' },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: isNote ? '#9333EA' : '#0745E8' },
                ]}
              >
                {isNote ? 'Study Note' : 'Question Paper'}
              </Text>
            </View>

            {item.subType && (
              <Text style={styles.subTypeTag}>• {item.subType}</Text>
            )}

            {item.isDownloaded && (
              <View style={styles.offlineBadge}>
                <Feather name="check-circle" size={10} color="#059669" />
                <Text style={styles.offlineBadgeText}>Offline</Text>
              </View>
            )}
          </View>

          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.title}
          </Text>

          <Text style={styles.itemMeta}>
            {item.subjectCode} • {item.branch} • Sem {item.semester} • {item.fileSize}
          </Text>
        </View>

        {/* Bookmark Icon */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.actionIconButton}
          onPress={() => toggleBookmark(item.id)}
        >
          <Feather
            name="bookmark"
            size={18}
            color={item.isBookmarked ? '#0745E8' : '#94A3B8'}
          />
        </TouchableOpacity>
      </View>

      {/* Footer Row */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.openBtn}
          onPress={() => onOpenOffline(item)}
        >
          <Feather name="eye" size={15} color="#FFFFFF" />
          <Text style={styles.openBtnText}>Open Offline</Text>
        </TouchableOpacity>

        {item.isDownloaded && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.removeBtn}
            onPress={() => toggleDownload(item.id)}
          >
            <Feather name="trash-2" size={14} color="#EF4444" />
            <Text style={styles.removeBtnText}>Remove Download</Text>
          </TouchableOpacity>
        )}
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
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoWrapper: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
  },
  subTypeTag: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  offlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  offlineBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  itemMeta: {
    fontSize: 12,
    color: '#64748B',
  },
  actionIconButton: {
    padding: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  openBtn: {
    flex: 1,
    height: 38,
    backgroundColor: '#0745E8',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  openBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    height: 38,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  removeBtnText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: '700',
  },
});
