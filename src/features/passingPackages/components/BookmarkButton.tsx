import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked,
  onPress,
  size = 20,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        isBookmarked && styles.buttonActive,
        style,
      ]}
      onPress={onPress}
    >
      <Feather
        name={isBookmarked ? 'bookmark' : 'bookmark'}
        size={size}
        color={isBookmarked ? '#0745E8' : '#94A3B8'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#EEF2FF',
  },
});
