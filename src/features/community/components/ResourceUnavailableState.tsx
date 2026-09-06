import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ResourceUnavailableStateProps {
  reason?: string;
  onPressBack: () => void;
}

export const ResourceUnavailableState: React.FC<ResourceUnavailableStateProps> = ({
  reason = 'This resource is under moderation review or has been removed by the contributor.',
  onPressBack,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="alert-triangle" size={32} color="#EF4444" />
      </View>
      <Text style={styles.title}>Resource Temporarily Unavailable</Text>
      <Text style={styles.reason}>{reason}</Text>

      <TouchableOpacity activeOpacity={0.85} style={styles.btn} onPress={onPressBack}>
        <Feather name="arrow-left" size={16} color="#FFFFFF" />
        <Text style={styles.btnText}>Return to Community Feed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  reason: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#0745E8',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
