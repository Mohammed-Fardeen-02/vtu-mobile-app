import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { MOCK_RESOURCES } from '../api/notesData';

const { width } = Dimensions.get('window');

export const NoteReaderScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const resource = MOCK_RESOURCES.find((r) => r.id === id) || MOCK_RESOURCES[0];

  const totalPages = resource.totalPages || 32;
  const [currentPage, setCurrentPage] = useState(4);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(resource.isBookmarked);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Reader Control Header */}
      <View style={styles.readerHeader}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Feather name="chevron-left" size={22} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {resource.title}
          </Text>
          <Text style={styles.headerSub}>
            {resource.subjectCode} • Page {currentPage} of {totalPages}
          </Text>
        </View>

        <View style={styles.headerRightActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setIsBookmarked(!isBookmarked)}>
            <Feather
              name="bookmark"
              size={18}
              color={isBookmarked ? '#0745E8' : '#64748B'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="download" size={18} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Document Reader Canvas View */}
      <View style={styles.canvasContainer}>
        <View style={styles.pageCard}>
          <View style={styles.pageHeader}>
            <Text style={styles.pageSubjectTag}>{resource.subjectName} ({resource.subjectCode})</Text>
            <Text style={styles.pageNumberBadge}>PAGE {currentPage}</Text>
          </View>

          {/* Sample Document Page Text Content */}
          <Text style={styles.pageTitleText}>
            Unit {resource.unitNumber}: {resource.unitTitle}
          </Text>
          <Text style={styles.pageBodyText}>
            1.1 Overview of Application Layer Protocols:
          </Text>
          <Text style={styles.pageParagraph}>
            The application layer is located at the top of the OSI and TCP/IP reference models.
            It provides services directly to end-user applications such as web browsers, email clients,
            and file transfer utilities.
          </Text>
          <Text style={styles.pageBodyText}>Key Protocol Functions:</Text>
          <Text style={styles.pageBullet}>• HTTP/1.1 & HTTP/2 Stateless Request-Response Model</Text>
          <Text style={styles.pageBullet}>• Domain Name System (DNS) Hierarchical Tree Resolution</Text>
          <Text style={styles.pageBullet}>• Simple Mail Transfer Protocol (SMTP) for Email Transfer</Text>

          {/* Watermark Tag */}
          <View style={styles.watermarkContainer}>
            <Text style={styles.watermarkText}>VTU SUPER APP • VERIFIED ACADEMIC NOTE</Text>
          </View>
        </View>
      </View>

      {/* Bottom Reader Navigation Controls */}
      <View style={styles.readerFooter}>
        {/* Page Progress Track */}
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentPage / totalPages) * 100}%` },
            ]}
          />
        </View>

        <View style={styles.controlsRow}>
          {/* Zoom Controls */}
          <View style={styles.zoomControls}>
            <TouchableOpacity
              style={styles.zoomBtn}
              onPress={() => setZoomLevel(Math.max(75, zoomLevel - 25))}
            >
              <Feather name="minus" size={16} color="#475569" />
            </TouchableOpacity>
            <Text style={styles.zoomText}>{zoomLevel}%</Text>
            <TouchableOpacity
              style={styles.zoomBtn}
              onPress={() => setZoomLevel(Math.min(150, zoomLevel + 25))}
            >
              <Feather name="plus" size={16} color="#475569" />
            </TouchableOpacity>
          </View>

          {/* Page Navigation Prev / Next */}
          <View style={styles.pageNavControls}>
            <TouchableOpacity
              disabled={currentPage === 1}
              style={[styles.navBtn, currentPage === 1 && styles.disabledNavBtn]}
              onPress={handlePrevPage}
            >
              <Feather name="chevron-left" size={18} color={currentPage === 1 ? '#CBD5E1' : '#0745E8'} />
            </TouchableOpacity>

            <Text style={styles.pageIndicatorText}>
              {currentPage} / {totalPages}
            </Text>

            <TouchableOpacity
              disabled={currentPage === totalPages}
              style={[styles.navBtn, currentPage === totalPages && styles.disabledNavBtn]}
              onPress={handleNextPage}
            >
              <Feather
                name="chevron-right"
                size={18}
                color={currentPage === totalPages ? '#CBD5E1' : '#0745E8'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  readerHeader: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrapper: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 11,
    color: '#64748B',
  },
  headerRightActions: {
    flexDirection: 'row',
    gap: 8,
  },
  canvasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  pageCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    justifyContent: 'space-between',
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
  },
  pageSubjectTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0745E8',
  },
  pageNumberBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  pageTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 10,
  },
  pageBodyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 10,
  },
  pageParagraph: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    marginTop: 6,
  },
  pageBullet: {
    fontSize: 13,
    color: '#334155',
    marginTop: 6,
  },
  watermarkContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  watermarkText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  readerFooter: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0745E8',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 8,
  },
  zoomBtn: {
    padding: 4,
  },
  zoomText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  pageNavControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledNavBtn: {
    backgroundColor: '#F1F5F9',
  },
  pageIndicatorText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
});
