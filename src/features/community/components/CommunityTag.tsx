import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CommunityTagProps {
  tag: string;
  onPress?: () => void;
}

export const CommunityTag: React.FC<CommunityTagProps> = ({ tag, onPress }) => {
  const formattedTag = tag.startsWith('#') ? tag : `#${tag}`;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.tag}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.text}>{formattedTag}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0745E8',
  },
});
