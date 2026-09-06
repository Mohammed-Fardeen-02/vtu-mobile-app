import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSavedStore } from '../store/useSavedStore';

export const StorageSummaryCard: React.FC = () => {
  const { getStorageSummary, clearOfflineStorage, isOfflineMode, toggleOfflineMode } =
    useSavedStore();

  const summary = getStorageSummary();
  const percentage = Math.min(Math.round((summary.totalUsedMb / summary.maxStorageMb) * 100), 100);

  const handleClearCachePrompt = () => {
    Alert.alert(
      'Clear Offline Storage?',
      `Are you sure you want to remove ${summary.downloadedCount} saved offline files (${summary.totalUsedMb} MB)? Bookmarks will be preserved.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Storage',
          style: 'destructive',
          onPress: () => clearOfflineStorage(),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <View style={styles.storageTitleBox}>
          <View style={styles.iconCircle}>
            <Feather name="hard-drive" size={18} color="#0745E8" />
          </View>
          <View>
            <Text style={styles.cardTitle}>Offline Storage</Text>
            <Text style={styles.cardSub}>
              {summary.downloadedCount} Files • {summary.totalUsedMb} MB Used
            </Text>
          </View>
        </View>

        {/* Network Status Toggle Pill */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.networkPill, isOfflineMode ? styles.offlinePill : styles.onlinePill]}
          onPress={toggleOfflineMode}
        >
          <Feather
            name={isOfflineMode ? 'wifi-off' : 'wifi'}
            size={12}
            color={isOfflineMode ? '#D97706' : '#059669'}
          />
          <Text
            style={[
              styles.networkPillText,
              isOfflineMode ? styles.offlinePillText : styles.onlinePillText,
            ]}
          >
            {isOfflineMode ? 'Offline Mode' : 'Online'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Progress Track */}
      <View style={styles.gaugeSection}>
        <View style={styles.gaugeTrack}>
          <View style={[styles.gaugeFill, { width: `${Math.max(percentage, 4)}%` }]} />
        </View>
        <View style={styles.gaugeMetaRow}>
          <Text style={styles.gaugeMetaText}>{summary.totalUsedMb} MB used</Text>
          <Text style={styles.gaugeMetaText}>{summary.maxStorageMb} MB limit</Text>
        </View>
      </View>

      {/* Footer Action */}
      {summary.downloadedCount > 0 && (
        <View style={styles.footerRow}>
          <Text style={styles.footerInfoText}>
            {summary.bookmarkedCount} items bookmarked for quick revision
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.clearBtn}
            onPress={handleClearCachePrompt}
          >
            <Feather name="trash-2" size={13} color="#EF4444" />
            <Text style={styles.clearBtnText}>Clear Storage</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  storageTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  networkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  onlinePill: {
    backgroundColor: '#D1FAE5',
  },
  onlinePillText: {
    color: '#059669',
  },
  offlinePill: {
    backgroundColor: '#FEF3C7',
  },
  offlinePillText: {
    color: '#D97706',
  },
  networkPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  gaugeSection: {
    marginBottom: 12,
  },
  gaugeTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  gaugeFill: {
    height: '100%',
    backgroundColor: '#0745E8',
    borderRadius: 4,
  },
  gaugeMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gaugeMetaText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerInfoText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
    marginRight: 10,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#FEF2F2',
  },
  clearBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
  },
});
