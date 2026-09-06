import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { CommunityResource } from '../types/community.types';
import { RatingStars } from './RatingStars';
import { ContributorAvatar } from './ContributorAvatar';

interface FeaturedResourceCardProps {
  resource: CommunityResource;
  onPress: () => void;
}

export const FeaturedResourceCard: React.FC<FeaturedResourceCardProps> = ({
  resource,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress}>
      <LinearGradient
        colors={['#1E1B4B', '#311042', '#0F172A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.topBadge}>
          <Feather name="star" size={11} color="#F59E0B" />
          <Text style={styles.topBadgeText}>TOP RATED COMMUNITY NOTE</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {resource.title}
        </Text>

        <Text style={styles.subject}>
          {resource.subjectCode} • {resource.subjectName}
        </Text>

        <View style={styles.contributorRow}>
          <ContributorAvatar contributor={resource.contributor} size={28} />
          <View style={styles.contributorTextWrapper}>
            <Text style={styles.contributorName}>{resource.contributor.name}</Text>
            <Text style={styles.contributorCollege}>{resource.contributor.college}</Text>
          </View>

          <RatingStars rating={resource.rating} count={resource.ratingCount} />
        </View>

        <View style={styles.footer}>
          <View style={styles.statsPill}>
            <Feather name="thumbs-up" size={12} color="#34D399" />
            <Text style={styles.statsText}>{resource.usefulCount} Votes</Text>
          </View>
          <View style={styles.actionBtn}>
            <Text style={styles.actionText}>Read Notes</Text>
            <Feather name="arrow-right" size={14} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  topBadgeText: {
    color: '#FDE68A',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 4,
  },
  subject: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.78)',
    marginBottom: 14,
  },
  contributorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
  },
  contributorTextWrapper: {
    flex: 1,
  },
  contributorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  contributorCollege: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.65)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#34D399',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
