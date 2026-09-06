import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CommunityResource } from '../types/community.types';
import { CommunityBadge } from './CommunityBadge';
import { ResourceTypeBadge } from './ResourceTypeBadge';
import { RatingStars } from './RatingStars';
import { UsefulVoteButton } from './UsefulVoteButton';
import { ContributorMiniCard } from './ContributorMiniCard';
import { BookmarkButton } from '@/features/passingPackages/components/BookmarkButton';

interface CommunityResourceCardProps {
  resource: CommunityResource;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onToggleUseful: () => void;
  onPressCard: () => void;
  onPressContributor?: () => void;
}

export const CommunityResourceCard: React.FC<CommunityResourceCardProps> = ({
  resource,
  isBookmarked,
  onToggleBookmark,
  onToggleUseful,
  onPressCard,
  onPressContributor,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.card}
      onPress={onPressCard}
    >
      {/* Top Badge Strip */}
      <View style={styles.topRow}>
        <CommunityBadge isOfficial={resource.isOfficial} isVerified={resource.isVerified} size="small" />
        <ResourceTypeBadge type={resource.resourceType} size="small" />
        <View style={styles.spacer} />
        <BookmarkButton
          isBookmarked={isBookmarked}
          onPress={onToggleBookmark}
          size={16}
        />
      </View>

      {/* Resource Title */}
      <Text style={styles.title} numberOfLines={2}>
        {resource.title}
      </Text>

      {/* Subject & Unit Meta */}
      <View style={styles.subjectRow}>
        <View style={styles.codePill}>
          <Text style={styles.codeText}>{resource.subjectCode}</Text>
        </View>
        <Text style={styles.subjectName} numberOfLines={1}>{resource.subjectName}</Text>
        {resource.unitNumber ? (
          <View style={styles.unitPill}>
            <Text style={styles.unitText}>Unit {resource.unitNumber}</Text>
          </View>
        ) : null}
      </View>

      {/* File Stats Row */}
      <View style={styles.fileStatsRow}>
        <View style={styles.statItem}>
          <Feather name="file-text" size={12} color="#64748B" />
          <Text style={styles.statText}>{resource.pageCount} Pages • {resource.fileSize}</Text>
        </View>

        <View style={styles.statItem}>
          <Feather name="download-cloud" size={12} color="#64748B" />
          <Text style={styles.statText}>{resource.downloadsCount} Downloads</Text>
        </View>
      </View>

      {/* Contributor Mini Bar */}
      <View style={styles.contributorSection}>
        <ContributorMiniCard
          contributor={resource.contributor}
          uploadedAt={resource.uploadedAt}
          onPress={onPressContributor}
        />
      </View>

      {/* Footer Actions & Rating */}
      <View style={styles.footerRow}>
        <RatingStars rating={resource.rating} count={resource.ratingCount} />

        <UsefulVoteButton
          usefulCount={resource.usefulCount}
          isVoted={resource.isUsefulVoted}
          onPress={onToggleUseful}
          size="small"
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
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  spacer: { flex: 1 },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 22,
    marginBottom: 8,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  codePill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0745E8',
  },
  subjectName: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
    flex: 1,
  },
  unitPill: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  unitText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#334155',
  },
  fileStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 10,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  contributorSection: {
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
});
