import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface UsefulVoteButtonProps {
  usefulCount: number;
  isVoted?: boolean;
  onPress: () => void;
  size?: 'small' | 'medium';
}

export const UsefulVoteButton: React.FC<UsefulVoteButtonProps> = ({
  usefulCount,
  isVoted = false,
  onPress,
  size = 'medium',
}) => {
  const isSmall = size === 'small';

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[
        styles.button,
        isVoted ? styles.buttonVoted : styles.buttonNormal,
        isSmall && styles.buttonSmall,
      ]}
      onPress={onPress}
    >
      <Feather
        name="thumbs-up"
        size={isSmall ? 11 : 13}
        color={isVoted ? '#059669' : '#475569'}
      />
      <Text style={[styles.text, isVoted ? styles.textVoted : styles.textNormal, isSmall && styles.textSmall]}>
        {usefulCount} Useful
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 5,
  },
  buttonSmall: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  buttonNormal: {
    backgroundColor: '#F1F5F9',
  },
  buttonVoted: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
  textSmall: {
    fontSize: 10,
  },
  textNormal: {
    color: '#475569',
  },
  textVoted: {
    color: '#059669',
  },
});
