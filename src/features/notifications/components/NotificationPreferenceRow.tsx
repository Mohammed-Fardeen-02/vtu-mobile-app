import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

interface NotificationPreferenceRowProps {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

export const NotificationPreferenceRow: React.FC<NotificationPreferenceRowProps> = ({
  title,
  description,
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textCol}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#CBD5E1', true: '#C7D2FE' }}
        thumbColor={value ? '#0745E8' : '#94A3B8'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  textCol: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
});
