import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface DownloadButtonProps {
  isDownloaded: boolean;
  onPress: () => void;
  showText?: boolean;
  size?: number;
  style?: ViewStyle;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  isDownloaded,
  onPress,
  showText = false,
  size = 18,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.button,
        isDownloaded ? styles.buttonDownloaded : styles.buttonNormal,
        showText && styles.buttonWithText,
        style,
      ]}
      onPress={onPress}
    >
      <Feather
        name={isDownloaded ? 'check-circle' : 'download-cloud'}
        size={size}
        color={isDownloaded ? '#059669' : '#0745E8'}
      />
      {showText && (
        <Text style={[styles.text, isDownloaded ? styles.textDownloaded : styles.textNormal]}>
          {isDownloaded ? 'Downloaded' : 'Download'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  buttonNormal: {
    backgroundColor: '#EEF2FF',
  },
  buttonDownloaded: {
    backgroundColor: '#ECFDF5',
  },
  buttonWithText: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
  },
  textNormal: {
    color: '#0745E8',
  },
  textDownloaded: {
    color: '#059669',
  },
});
