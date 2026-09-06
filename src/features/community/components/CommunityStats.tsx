import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const CommunityStats: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tile}>
        <Feather name="file-text" size={18} color="#7C3AED" />
        <Text style={styles.number}>1,420+</Text>
        <Text style={styles.label}>Notes Shared</Text>
      </View>

      <View style={styles.tile}>
        <Feather name="thumbs-up" size={18} color="#059669" />
        <Text style={styles.number}>18.4k</Text>
        <Text style={styles.label}>Useful Votes</Text>
      </View>

      <View style={styles.tile}>
        <Feather name="award" size={18} color="#0745E8" />
        <Text style={styles.number}>380+</Text>
        <Text style={styles.label}>Contributors</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  tile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  number: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },
  label: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 1,
  },
});
