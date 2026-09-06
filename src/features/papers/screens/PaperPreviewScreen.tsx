import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePaperStore } from '../store/usePaperStore';
import { PaperPreviewModal } from '../components/PaperPreviewModal';
import { DownloadProgressModal } from '../components/DownloadProgressModal';
import { QuestionPaper } from '../types/paper.types';

export const PaperPreviewScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { papers, startDownload } = usePaperStore();

  const paper = papers.find((p) => p.id === id) || papers[0];
  const [downloadModalPaper, setDownloadModalPaper] = useState<QuestionPaper | null>(null);

  const handleDownload = (p: QuestionPaper) => {
    startDownload(p.id);
    setDownloadModalPaper(p);
  };

  return (
    <View style={styles.container}>
      <PaperPreviewModal
        paper={paper}
        visible={true}
        onClose={() => router.back()}
        onDownload={handleDownload}
      />
      <DownloadProgressModal
        paper={downloadModalPaper}
        visible={!!downloadModalPaper}
        onClose={() => setDownloadModalPaper(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});
