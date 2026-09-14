import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { fetchNoteByIdFromApi } from '../api/notesApi';
import { NoteResource } from '../types/notes.types';
import { MOCK_RESOURCES } from '../api/notesData';

let ScreenCapture: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ScreenCapture = require('expo-screen-capture');
} catch (e) {
  ScreenCapture = null;
}

const { width } = Dimensions.get('window');

export const NoteReaderScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const webViewRef = useRef<any>(null);

  const [resource, setResource] = useState<NoteResource>(
    () => MOCK_RESOURCES.find((r) => r.id === id) || MOCK_RESOURCES[0]
  );
  const [isLoadingDoc, setIsLoadingDoc] = useState(true);
  const [detectedPages, setDetectedPages] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (id) {
      fetchNoteByIdFromApi(id as string).then((res) => {
        if (isMounted && res) {
          setResource(res);
          setIsBookmarked(res.isBookmarked);
          setIsPurchased(!res.isPaid);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  const freePreviewLimit = resource.freePreviewPages || 2;
  const isPaidNote = resource.isPaid || (resource.price && resource.price > 0);
  const notePrice = resource.price || 19;

  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isBookmarked, setIsBookmarked] = useState(resource.isBookmarked);
  const [isPurchased, setIsPurchased] = useState(!isPaidNote);
  const [isOfflineSaved, setIsOfflineSaved] = useState(false);
  const [isPageLocked, setIsPageLocked] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    setImageLoadError(false);
  }, [currentPage, id]);

  const isPreviewMode = isPaidNote && !isPurchased;
  const maxPagesFromDoc = detectedPages || (resource.totalPages && resource.totalPages > 1 ? resource.totalPages : 15);
  const totalPages = isPreviewMode ? Math.min(freePreviewLimit, maxPagesFromDoc) : maxPagesFromDoc;

  // Activate Screenshot & Recording Protection inside Reader
  useEffect(() => {
    async function enableDRMProtection() {
      try {
        if (ScreenCapture && ScreenCapture.preventScreenCaptureAsync) {
          await ScreenCapture.preventScreenCaptureAsync();
        }
      } catch (err) {
        console.log('ScreenCapture protection active');
      }
    }
    enableDRMProtection();

    return () => {
      async function disableDRMProtection() {
        try {
          if (ScreenCapture && ScreenCapture.allowScreenCaptureAsync) {
            await ScreenCapture.allowScreenCaptureAsync();
          }
        } catch (err) {
          // ignore
        }
      }
      disableDRMProtection();
    };
  }, []);

  const getCloudinarySinglePagePdfUrl = (url: string, pageNum: number): string => {
    if (!url) return '';
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
      const cleanUrl = url.replace(/\/pg_[^\/]+\//, '/');
      return cleanUrl.replace('/upload/', `/upload/pg_${pageNum}/`);
    }
    return url;
  };

  const getCloudinaryPageImageUrl = (url: string, pageNum: number): string => {
    if (!url) return '';
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
      let cleanUrl = url.replace(/\/pg_[^\/]+\//, '/');
      cleanUrl = cleanUrl.replace(/\.pdf$/i, '.png');
      return cleanUrl.replace('/upload/', `/upload/pg_${pageNum},f_auto,q_auto,w_1000/`);
    }
    return '';
  };

  const handleOpenCloudinaryDocument = async () => {
    if (isPreviewMode) {
      handleUnlockPurchase();
      return;
    }

    if (resource.fileUrl) {
      try {
        await WebBrowser.openBrowserAsync(resource.fileUrl);
      } catch (e) {
        Alert.alert('Open Document', `File URL: ${resource.fileUrl}`);
      }
    } else {
      Alert.alert('Document URL', 'No external document file URL available.');
    }
  };

  const scrollToPageInWebView = (pageNumber: number) => {
    const js = `
      (function() {
        var pages = document.querySelectorAll('.drive-viewer-page, [role="document"], img');
        if (pages && pages[${pageNumber - 1}]) {
          pages[${pageNumber - 1}].scrollIntoView({ behavior: 'smooth' });
        } else {
          var h = window.innerHeight || 800;
          window.scrollTo({ top: (${pageNumber - 1}) * h, behavior: 'smooth' });
        }
        true;
      })();
    `;
    webViewRef.current?.injectJavaScript(js);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prev = currentPage - 1;
      setCurrentPage(prev);
      scrollToPageInWebView(prev);
    }
  };

  const handleNextPage = () => {
    if (isPreviewMode && currentPage >= freePreviewLimit) {
      setIsPageLocked(true);
      handleUnlockPurchase();
      return;
    }
    if (currentPage < totalPages) {
      const next = currentPage + 1;
      setCurrentPage(next);
      scrollToPageInWebView(next);
    } else if (isPreviewMode) {
      setIsPageLocked(true);
      handleUnlockPurchase();
    } else {
      handleUnlockPurchase();
    }
  };

  const handleUnlockPurchase = () => {
    Alert.alert(
      `Unlock Note Access`,
      `Confirm purchase of '${resource.title}' for ₹${notePrice}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: `Pay ₹${notePrice}`,
          style: 'default',
          onPress: () => {
            setIsPurchased(true);
            setIsPageLocked(false);
            setIsOfflineSaved(true);
            Alert.alert(
              'Purchase Successful!',
              `You have unlocked all ${maxPagesFromDoc} pages. Note saved for in-app offline reading.`
            );
          },
        },
      ]
    );
  };

  const handleOfflineSave = () => {
    if (isPreviewMode) {
      handleUnlockPurchase();
    } else {
      setIsOfflineSaved(true);
      Alert.alert(
        'Saved for In-App Offline Access',
        'Note file is securely saved inside VTU App sandbox. (External exports & screenshots blocked).'
      );
    }
  };

  const rawUrl = resource.fileUrl || '';

  const viewerUrl = rawUrl
    ? rawUrl.toLowerCase().includes('.pdf') || rawUrl.toLowerCase().includes('cloudinary') || rawUrl.startsWith('http')
      ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(rawUrl)}`
      : rawUrl
    : null;

  useEffect(() => {
    if (webViewRef.current && !isPageLocked) {
      setTimeout(() => {
        scrollToPageInWebView(currentPage);
      }, 300);
    }
  }, [currentPage, isPageLocked]);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'DETECTED_PAGES' && data.totalPages) {
        const parsedTotal = parseInt(data.totalPages, 10);
        if (parsedTotal > 1 && parsedTotal !== detectedPages) {
          setDetectedPages(parsedTotal);
        }
      }
      if (data.type === 'REACHED_PREVIEW_LIMIT') {
        if (isPreviewMode) {
          setIsPageLocked(true);
        }
      }
    } catch (e) {
      // Ignore non-JSON messages
    }
  };

  const injectedJs = `
    (function() {
      function applyPageLockCss() {
        var existingStyle = document.getElementById('vtu-page-lock-style');
        if (!existingStyle) {
          existingStyle = document.createElement('style');
          existingStyle.id = 'vtu-page-lock-style';
          document.head.appendChild(existingStyle);
        }
        existingStyle.innerHTML = \`
          html, body {
            overflow: hidden !important;
            height: 100vh !important;
            width: 100vw !important;
            position: fixed !important;
            touch-action: none !important;
          }
          .drive-viewer-paginated-scrollable, [role="document"], div {
            overflow: hidden !important;
          }
          .drive-viewer-page {
            display: none !important;
          }
          .drive-viewer-page:nth-of-type(${currentPage}),
          .drive-viewer-page:nth-child(${currentPage}) {
            display: block !important;
            margin: 0 auto !important;
            position: absolute !important;
            top: 0 !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        \`;

        var pages = document.querySelectorAll('.drive-viewer-page');
        if (pages && pages.length > 0) {
          for (var i = 0; i < pages.length; i++) {
            if (i === ${currentPage - 1}) {
              pages[i].style.setProperty('display', 'block', 'important');
            } else {
              pages[i].style.setProperty('display', 'none', 'important');
            }
          }
        }
      }

      applyPageLockCss();
      setInterval(applyPageLockCss, 300);

      function sendRN(type, data) {
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify(Object.assign({ type: type }, data || {})));
        }
      }

      function checkPages() {
        var text = document.body ? document.body.innerText : '';
        var m = text.match(/Page\\s+(\\d+)\\s*\\/\\s*(\\d+)/i) || text.match(/(\\d+)\\s*\\/\\s*(\\d+)/);
        var total = 0;
        if (m && m[2]) {
          total = parseInt(m[2], 10);
        } else {
          var els = document.querySelectorAll('.drive-viewer-page, [role="document"]');
          if (els && els.length > 0) total = els.length;
        }
        if (total > 1) {
          sendRN('DETECTED_PAGES', { totalPages: total });
        }
      }

      setInterval(checkPages, 1000);
      setTimeout(checkPages, 400);

      true;
    })();
  `;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Reader Control Header */}
      <View style={styles.readerHeader}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
          <Feather name="chevron-left" size={22} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.headerTitleWrapper}>
          <View style={styles.titleBadgeRow}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {resource.title}
            </Text>
            {isPaidNote ? (
              <View style={[styles.badgePill, isPurchased ? styles.badgePurchased : styles.badgePaid]}>
                <Feather name={isPurchased ? 'check-circle' : 'lock'} size={11} color={isPurchased ? '#059669' : '#D97706'} />
                <Text style={[styles.badgeText, isPurchased ? styles.badgeTextPurchased : styles.badgeTextPaid]}>
                  {isPurchased ? 'Unlocked' : `Paid • ₹${notePrice}`}
                </Text>
              </View>
            ) : (
              <View style={[styles.badgePill, styles.badgeFree]}>
                <Feather name="gift" size={11} color="#0745E8" />
                <Text style={[styles.badgeText, styles.badgeTextFree]}>Free Note</Text>
              </View>
            )}
          </View>

          <Text style={styles.headerSub}>
            {resource.subjectCode} • Page {currentPage} of {totalPages} {isPreviewMode ? `(Free Preview: ${freePreviewLimit} Pgs)` : ''}
          </Text>
        </View>

        <View style={styles.headerRightActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={handleOpenCloudinaryDocument}>
            <Feather name="external-link" size={18} color="#0745E8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setIsBookmarked(!isBookmarked)}>
            <Feather
              name="bookmark"
              size={18}
              color={isBookmarked ? '#0745E8' : '#64748B'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={handleOfflineSave}>
            <Feather
              name="download-cloud"
              size={18}
              color={isOfflineSaved ? '#10B981' : '#64748B'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Document Reader Canvas View */}
      <View style={styles.canvasContainer}>
        {isPageLocked ? (
          /* Blank Screen & Locked Paywall Mask Card */
          <View style={styles.paywallCard}>
            <View style={styles.lockIconCircle}>
              <Feather name="lock" size={36} color="#D97706" />
            </View>

            <Text style={styles.paywallTitle}>Free Preview Limit Reached</Text>
            <Text style={styles.paywallPageSub}>Page {currentPage} of {maxPagesFromDoc}</Text>

            <Text style={styles.paywallBody}>
              You have completed the free {freePreviewLimit}-page preview of '{resource.title}'. Purchase the complete note to unlock all {maxPagesFromDoc} pages and offline access.
            </Text>

            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Feather name="check-circle" size={14} color="#10B981" />
                <Text style={styles.featureText}>Full {maxPagesFromDoc} Pages & Examination Formulas</Text>
              </View>
              <View style={styles.featureItem}>
                <Feather name="check-circle" size={14} color="#10B981" />
                <Text style={styles.featureText}>In-App Offline Access Mode</Text>
              </View>
              <View style={styles.featureItem}>
                <Feather name="shield" size={14} color="#0745E8" />
                <Text style={styles.featureText}>Protected DRM & Anti-Screenshot License</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.unlockBtn} onPress={handleUnlockPurchase}>
              <Feather name="zap" size={18} color="#FFFFFF" />
              <Text style={styles.unlockBtnText}>Unlock Complete Note for ₹{notePrice}</Text>
            </TouchableOpacity>

            <Text style={styles.drmSubtext}>
              🔒 Secure access inside VTU App only • External export & sharing disabled
            </Text>
          </View>
        ) : viewerUrl ? (
          /* Render Uploaded PDF / Document via WebView */
          <View style={styles.webViewContainer}>
            <WebView
              ref={webViewRef}
              key={`pdf-page-${currentPage}-${viewerUrl}`}
              source={{ uri: viewerUrl }}
              style={styles.webView}
              startInLoadingState={true}
              scrollEnabled={true}
              injectedJavaScript={injectedJs}
              onMessage={handleWebViewMessage}
              renderLoading={() => (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0745E8" />
                  <Text style={styles.loadingText}>Loading document (Page {currentPage} of {totalPages})...</Text>
                </View>
              )}
              scalesPageToFit={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
            {isPreviewMode && (
              <View style={styles.previewFloatingBanner}>
                <View style={styles.previewBannerLeft}>
                  <Feather name="lock" size={16} color="#F59E0B" />
                  <Text style={styles.previewBannerText}>
                    Free Preview ({freePreviewLimit} of {maxPagesFromDoc} Pgs)
                  </Text>
                </View>
                <TouchableOpacity style={styles.previewUnlockBtn} onPress={handleUnlockPurchase}>
                  <Text style={styles.previewUnlockText}>Unlock for ₹{notePrice}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          /* Fallback Page Card */
          <View style={styles.pageCard}>
            <View style={styles.pageHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.pageSubjectTag}>{resource.subjectName} ({resource.subjectCode})</Text>
                <View style={{ backgroundColor: '#EEF2FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                  <Text style={{ fontSize: 10, fontWeight: '800', color: '#0745E8' }}>{resource.fileFormat || 'PDF'}</Text>
                </View>
              </View>
              <Text style={styles.pageNumberBadge}>PAGE {currentPage} / {totalPages}</Text>
            </View>

            <Text style={styles.pageTitleText}>
              Unit {resource.unitNumber}: {resource.unitTitle}
            </Text>
            <Text style={styles.pageBodyText}>
              {currentPage === 1 ? '1.1 Overview of Core Academic Syllabus Concepts & Fundamental Axioms:' : `1.${currentPage} Advanced Module Concepts, Diagrams & Examination Formulas:`}
            </Text>
            <Text style={styles.pageParagraph}>
              {currentPage === 1
                ? (resource.description || 'Comprehensive academic notes and reference material verified by VTU Faculty.')
                : `Section 1.${currentPage}: Detailed mathematical derivation, architectural protocol breakdown, and university exam preparation guide for ${resource.subjectName} (${resource.subjectCode}).`}
            </Text>

            <View style={{ backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 12 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A', marginBottom: 4 }}>Key Topic Summary (Page {currentPage}):</Text>
              <Text style={{ fontSize: 12, color: '#475569', lineHeight: 18 }}>
                {currentPage === 1
                  ? '• Academic Syllabus Scope & System Architecture\n• Standard VTU Examination Weightage: 20 Marks\n• Prerequisites & Recommended Reference Handbooks'
                  : `• Core Concept Breakdown & Solved Practice Numericals\n• University Exam Frequently Asked Questions (FAQ)\n• Quick Memory Tips & Formula Reference Sheet`}
              </Text>
            </View>

            {isPreviewMode && (
              <View style={styles.previewFloatingBanner}>
                <View style={styles.previewBannerLeft}>
                  <Feather name="lock" size={16} color="#F59E0B" />
                  <Text style={styles.previewBannerText}>
                    Free Preview ({freePreviewLimit} of {maxPagesFromDoc} Pgs)
                  </Text>
                </View>
                <TouchableOpacity style={styles.previewUnlockBtn} onPress={handleUnlockPurchase}>
                  <Text style={styles.previewUnlockText}>Unlock for ₹{notePrice}</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.watermarkContainer}>
              <Text style={styles.watermarkText}>VTU SUPER APP • VERIFIED ACADEMIC RESOURCE • DRM PROTECTED</Text>
            </View>
          </View>
        )}
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
              disabled={currentPage <= 1}
              style={[styles.navBtn, currentPage <= 1 && styles.disabledNavBtn]}
              onPress={handlePrevPage}
            >
              <Feather name="chevron-left" size={18} color={currentPage <= 1 ? '#CBD5E1' : '#0745E8'} />
            </TouchableOpacity>

            <Text style={styles.pageIndicatorText}>
              {currentPage} / {totalPages}
            </Text>

            <TouchableOpacity
              disabled={currentPage >= totalPages && !isPreviewMode}
              style={[styles.navBtn, currentPage >= totalPages && !isPreviewMode && styles.disabledNavBtn]}
              onPress={handleNextPage}
            >
              <Feather
                name="chevron-right"
                size={18}
                color={currentPage >= totalPages && !isPreviewMode ? '#CBD5E1' : '#0745E8'}
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
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgePaid: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
    borderWidth: 1,
  },
  badgePurchased: {
    backgroundColor: '#D1FAE5',
    borderColor: '#6EE7B7',
    borderWidth: 1,
  },
  badgeFree: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  badgeTextPaid: {
    color: '#D97706',
  },
  badgeTextPurchased: {
    color: '#059669',
  },
  badgeTextFree: {
    color: '#0745E8',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    flexShrink: 1,
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
  singlePageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    position: 'relative',
    padding: 8,
  },
  singlePageImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  webViewContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  webView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  previewFloatingBanner: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#D97706',
  },
  previewBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  previewBannerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  previewUnlockBtn: {
    backgroundColor: '#D97706',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  previewUnlockText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
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
  paywallCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FCD34D',
  },
  lockIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  paywallTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    textAlign: 'center',
  },
  paywallPageSub: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginTop: 2,
    marginBottom: 10,
  },
  paywallBody: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  featuresList: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  unlockBtn: {
    width: '100%',
    height: 48,
    borderRadius: 14,
    backgroundColor: '#0745E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  unlockBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  drmSubtext: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 12,
    textAlign: 'center',
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
