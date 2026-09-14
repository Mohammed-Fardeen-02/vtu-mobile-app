import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { QuestionPaper } from '../types/paper.types';
import { DocumentThumbnail } from './DocumentThumbnail';
import { usePaperStore } from '../store/usePaperStore';

interface PaperCardProps {
  paper: QuestionPaper;
  onPreview: (paper: QuestionPaper) => void;
  onDownload: (paper: QuestionPaper) => void;
  onPressCard?: (paper: QuestionPaper) => void;
}

export const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  onPreview,
  onDownload,
  onPressCard,
}) => {
  const { bookmarkedIds, downloadedIds, downloadProgressMap, toggleBookmark } = usePaperStore();

  const isBookmarked = bookmarkedIds.includes(paper.id);
  const isDownloaded = downloadedIds.includes(paper.id);
  const downloadState = downloadProgressMap[paper.id];
  const isDownloading = downloadState && !downloadState.isCompleted && downloadState.progress < 100;

  const getBadgeStyle = () => {
    switch (paper.paperType) {
      case 'Regular':
        return { bg: '#EEF2FF', text: '#0745E8' };
      case 'Makeup':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'Model':
        return { bg: '#D1FAE5', text: '#059669' };
      default:
        return { bg: '#F1F5F9', text: '#475569' };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => (onPressCard ? onPressCard(paper) : onPreview(paper))}
    >
      <View style={styles.topRow}>
        {/* Document Thumbnail */}
        <DocumentThumbnail
          subjectCode={paper.subjectCode}
          scheme={paper.scheme}
          paperType={paper.paperType}
          pageCount={paper.pageCount}
          bgAccent={paper.thumbnailBg}
        />

        {/* Paper Details */}
        <View style={styles.infoWrapper}>
          <View style={styles.tagsRow}>
            {/* Mode Tag */}
            <View
              style={[
                styles.paperTypeTag,
                { backgroundColor: paper.contentType === 'PDF_UPLOAD' ? '#FFF7ED' : '#F3E8FF' },
              ]}
            >
              <Text
                style={[
                  styles.paperTypeText,
                  { color: paper.contentType === 'PDF_UPLOAD' ? '#C2410C' : '#7E22CE' },
                ]}
              >
                {paper.contentType === 'PDF_UPLOAD' ? '📄 PDF' : '📝 Digital'}
              </Text>
            </View>
            <Text style={styles.metaDot}>•</Text>

            {/* Paper Type Tag */}
            <View style={[styles.paperTypeTag, { backgroundColor: badgeStyle.bg }]}>
              <Text style={[styles.paperTypeText, { color: badgeStyle.text }]}>
                {paper.paperType}
              </Text>
            </View>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.schemeTag}>{paper.scheme} Scheme</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.yearTag}>{paper.year}</Text>
          </View>

          <Text style={styles.subjectName} numberOfLines={1}>
            {paper.subjectName}
          </Text>

          <Text style={styles.codeSemText}>
            {paper.subjectCode} • {paper.branch} • Sem {paper.semester}
          </Text>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Feather name="eye" size={13} color="#64748B" />
              <Text style={styles.statText}>{paper.viewsCount.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="download" size={13} color="#64748B" />
              <Text style={styles.statText}>{paper.downloadsCount.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Feather name="file-text" size={13} color="#64748B" />
              <Text style={styles.statText}>{paper.fileSize}</Text>
            </View>
          </View>
        </View>

        {/* Bookmark Icon */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.bookmarkBtn}
          onPress={() => toggleBookmark(paper.id)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather
            name={isBookmarked ? 'bookmark' : 'bookmark'}
            size={20}
            color={isBookmarked ? '#0745E8' : '#94A3B8'}
            style={isBookmarked ? { fill: '#0745E8' } as any : {}}
          />
        </TouchableOpacity>
      </View>

      {/* Action Footer */}
      <View style={styles.actionFooter}>
        {/* Preview Button (Primary Action) */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.previewBtn}
          onPress={() => onPreview(paper)}
        >
          <Feather name="eye" size={15} color="#FFFFFF" />
          <Text style={styles.previewBtnText}>Preview</Text>
        </TouchableOpacity>

        {/* Download Button (Secondary/Status Action) */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.downloadBtn,
            isDownloaded && styles.downloadedBtn,
            isDownloading && styles.downloadingBtn,
          ]}
          onPress={() => onDownload(paper)}
        >
          {isDownloaded ? (
            <>
              <Feather name="check-circle" size={15} color="#059669" />
              <Text style={styles.downloadedText}>Available Offline</Text>
            </>
          ) : isDownloading ? (
            <>
              <Feather name="loader" size={15} color="#0745E8" />
              <Text style={styles.downloadingText}>{downloadState?.progress}% Downloading</Text>
            </>
          ) : (
            <>
              <Feather name="download" size={15} color="#0F172A" />
              <Text style={styles.downloadBtnText}>Download</Text>
            </>
          )}
        </TouchableOpacity>
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  infoWrapper: {
    flex: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  paperTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  paperTypeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  metaDot: {
    marginHorizontal: 4,
    color: '#CBD5E1',
    fontSize: 10,
  },
  schemeTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  yearTag: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  codeSemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  bookmarkBtn: {
    padding: 4,
  },
  actionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  previewBtn: {
    flex: 1,
    height: 40,
    backgroundColor: '#0745E8',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  previewBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  downloadBtn: {
    flex: 1,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  downloadBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },
  downloadedBtn: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  downloadedText: {
    color: '#059669',
    fontSize: 13,
    fontWeight: '700',
  },
  downloadingBtn: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  downloadingText: {
    color: '#0745E8',
    fontSize: 13,
    fontWeight: '700',
  },
});
