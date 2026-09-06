import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface PackageSectionCardProps {
  title: string;
  subtitle: string;
  iconName: keyof typeof Feather.glyphMap;
  iconColor: string;
  iconBg: string;
  badgeCount?: number | string;
  badgeColor?: string;
  badgeTextColor?: string;
  onPress: () => void;
  isSpecial?: boolean;
}

export const PackageSectionCard: React.FC<PackageSectionCardProps> = ({
  title,
  subtitle,
  iconName,
  iconColor,
  iconBg,
  badgeCount,
  badgeColor = '#EEF2FF',
  badgeTextColor = '#0745E8',
  onPress,
  isSpecial = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, isSpecial && styles.specialCard]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        <Feather name={iconName} size={22} color={iconColor} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, isSpecial && styles.specialTitle]}>{title}</Text>
          {badgeCount !== undefined && (
            <View style={[styles.badge, { backgroundColor: badgeColor }]}>
              <Text style={[styles.badgeText, { color: badgeTextColor }]}>
                {badgeCount}
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.subtitle, isSpecial && styles.specialSub]} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>

      <Feather name="chevron-right" size={20} color={isSpecial ? '#A7F3D0' : '#CBD5E1'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
  specialCard: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  specialTitle: {
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  specialSub: {
    color: '#94A3B8',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
});
