import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ProfileMenuRowProps {
  title: string;
  subtitle?: string;
  badge?: string;
  iconName: keyof typeof Feather.glyphMap;
  iconColor?: string;
  iconBg?: string;
  onPress: () => void;
}

export const ProfileMenuRow: React.FC<ProfileMenuRowProps> = ({
  title,
  subtitle,
  badge,
  iconName,
  iconColor = '#0F172A',
  iconBg = '#F8FAFC',
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.rowContainer}
      onPress={onPress}
    >
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Feather name={iconName} size={18} color={iconColor} />
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        {subtitle && <Text style={styles.subText}>{subtitle}</Text>}
      </View>

      {badge && (
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      <Feather name="chevron-right" size={18} color="#94A3B8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  subText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  badgePill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0745E8',
  },
});
