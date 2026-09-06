import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SaveButtonProps {
  label?: string;
  loading?: boolean;
  onPress: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  label = 'Save Academic Profile',
  loading = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={loading}
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          <Feather name="check-circle" size={18} color="#FFFFFF" />
          <Text style={styles.buttonText}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 16,
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
