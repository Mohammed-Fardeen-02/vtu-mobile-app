import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useNotificationsStore } from '../store/useNotificationsStore';
import { NotificationPreferenceRow } from '../components/NotificationPreferenceRow';

export const NotificationPreferencesScreen: React.FC = () => {
  const router = useRouter();
  const { preferences, togglePreference } = useNotificationsStore();

  return (
    <View style={styles.root}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>Notification Preferences</Text>
            <Text style={styles.headerSub}>Manage Push Alerts & Categories</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Academic & Examinations</Text>

          <NotificationPreferenceRow
            title="Exam & IA Reminders"
            description="Receive timely alerts before internal assessment tests and SEE theory exams."
            value={preferences.examReminders}
            onValueChange={() => togglePreference('examReminders')}
          />

          <NotificationPreferenceRow
            title="Academic Updates"
            description="Official VTU circulars, syllabus updates, and scheme notifications."
            value={preferences.academicUpdates}
            onValueChange={() => togglePreference('academicUpdates')}
          />

          <NotificationPreferenceRow
            title="Result Declaration Alerts"
            description="Instant notification when VTU publishes regular & revaluation results."
            value={preferences.resultUpdates}
            onValueChange={() => togglePreference('resultUpdates')}
          />

          <NotificationPreferenceRow
            title="Academic Calendar Revisions"
            description="Notifications regarding practical exam dates, holidays, and term ends."
            value={preferences.calendarUpdates}
            onValueChange={() => togglePreference('calendarUpdates')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Study Materials</Text>

          <NotificationPreferenceRow
            title="New Study Notes Added"
            description="Alerts when module PDF notes are uploaded for your branch & semester."
            value={preferences.newNotes}
            onValueChange={() => togglePreference('newNotes')}
          />

          <NotificationPreferenceRow
            title="New Solved Question Papers"
            description="Alerts when solved VTU question papers with scheme answers are added."
            value={preferences.newQuestionPapers}
            onValueChange={() => togglePreference('newQuestionPapers')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>App & Community</Text>

          <NotificationPreferenceRow
            title="Important Announcements"
            description="System notifications, feature releases, and app maintenance updates."
            value={preferences.importantAnnouncements}
            onValueChange={() => togglePreference('importantAnnouncements')}
          />

          <NotificationPreferenceRow
            title="App Feature Updates"
            description="Tips and release notes for new tools in VTU Student Super App."
            value={preferences.appUpdates}
            onValueChange={() => togglePreference('appUpdates')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSafeArea: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitleGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSub: {
    fontSize: 12,
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
});
