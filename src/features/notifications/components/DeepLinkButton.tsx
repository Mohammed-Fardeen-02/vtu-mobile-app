import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface DeepLinkButtonProps {
  label: string;
  targetRoute: string;
}

export const DeepLinkButton: React.FC<DeepLinkButtonProps> = ({
  label,
  targetRoute,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.button}
      onPress={() => router.push(targetRoute as any)}
    >
      <Text style={styles.buttonText}>{label}</Text>
      <Feather name="arrow-right" size={16} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#0745E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
