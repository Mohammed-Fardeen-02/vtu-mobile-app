import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNotificationsStore } from '../store/useNotificationsStore';

export const NotificationPermissionCard: React.FC = () => {
  const { permissionGranted, setPermissionGranted } = useNotificationsStore();

  if (permissionGranted) return null;

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Feather name="bell" size={20} color="#0745E8" />
      </View>

      <View style={styles.textCol}>
        <Text style={styles.title}>Enable Push Notifications</Text>
        <Text style={styles.subText}>
          Get instant alerts for VTU exam timetables, result declarations, and internal assessment schedules.
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.enableBtn}
          onPress={() => setPermissionGranted(true)}
        >
          <Text style={styles.enableBtnText}>Enable Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  subText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 17,
    marginBottom: 10,
  },
  enableBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#0745E8',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
  },
  enableBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
