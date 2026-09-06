import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CommunityResource } from '../types/community.types';
import { RatingStars } from './RatingStars';
import { ResourceTypeBadge } from './ResourceTypeBadge';
import { CommunityBadge } from './CommunityBadge';

interface ResourceInfoCardProps {
  resource: CommunityResource;
}

export const ResourceInfoCard: React.FC<ResourceInfoCardProps> = ({ resource }) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <CommunityBadge isOfficial={resource.isOfficial} isVerified={resource.isVerified} />
        <ResourceTypeBadge type={resource.resourceType} />
      </View>

      <Text style={styles.title}>{resource.title}</Text>

      <View style={styles.subjectBox}>
        <Text style={styles.subjectCode}>{resource.subjectCode}</Text>
        <Text style={styles.subjectName}>{resource.subjectName}</Text>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricTile}>
          <RatingStars rating={resource.rating} count={resource.ratingCount} size={15} />
          <Text style={styles.metricLabel}>Community Rating</Text>
        </View>

        <View style={styles.metricTile}>
          <Text style={styles.metricValue}>{resource.usefulCount}</Text>
          <Text style={styles.metricLabel}>Useful Votes</Text>
        </View>

        <View style={styles.metricTile}>
          <Text style={styles.metricValue}>{resource.downloadsCount}</Text>
          <Text style={styles.metricLabel}>Downloads</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Feather name="layers" size={13} color="#64748B" />
          <Text style={styles.metaText}>
            Unit {resource.unitNumber || 1} • {resource.scheme} Scheme
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Feather name="file" size={13} color="#64748B" />
          <Text style={styles.metaText}>{resource.pageCount} Pages ({resource.fileSize})</Text>
        </View>
      </View>

      {resource.description ? (
        <View style={styles.descSection}>
          <Text style={styles.descLabel}>About this Note:</Text>
          <Text style={styles.descBody}>{resource.description}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
    marginBottom: 10,
  },
  subjectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 14,
  },
  subjectCode: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0745E8',
  },
  subjectName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E40AF',
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  metricTile: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  descSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  descLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 4,
  },
  descBody: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
  },
});
