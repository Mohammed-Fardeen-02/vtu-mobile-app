import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface MarkAllReadButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const MarkAllReadButton: React.FC<MarkAllReadButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
    >
      <Feather name="check-circle" size={14} color={disabled ? '#94A3B8' : '#0745E8'} />
      <Text style={[styles.text, disabled && styles.textDisabled]}>Mark All Read</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: '#F1F5F9',
  },
  text: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0745E8',
  },
  textDisabled: {
    color: '#94A3B8',
  },
});
