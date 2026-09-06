import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Contributor } from '../types/community.types';
import { ContributorAvatar } from './ContributorAvatar';

interface ContributorMiniCardProps {
  contributor: Contributor;
  onPress?: () => void;
  uploadedAt?: string;
}

export const ContributorMiniCard: React.FC<ContributorMiniCardProps> = ({
  contributor,
  onPress,
  uploadedAt,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={onPress}
      disabled={!onPress}
    >
      <ContributorAvatar contributor={contributor} size={38} />

      <View style={styles.infoWrapper}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{contributor.name}</Text>
          <View style={styles.badgePill}>
            <Text style={styles.badgeText}>{contributor.reputationBadge}</Text>
          </View>
        </View>

        <Text style={styles.meta} numberOfLines={1}>
          {contributor.branch} • Sem {contributor.semester} • {contributor.college}
          {uploadedAt ? ` • ${uploadedAt}` : ''}
        </Text>
      </View>

      {onPress && <Feather name="chevron-right" size={16} color="#94A3B8" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoWrapper: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  badgePill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#B45309',
  },
  meta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
});
