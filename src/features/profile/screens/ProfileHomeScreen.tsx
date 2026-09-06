import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store';
import { StudentProfileHeader } from '../components/StudentProfileHeader';
import { AcademicIdentityCard } from '../components/AcademicIdentityCard';
import { SectionHeader } from '../components/SectionHeader';
import { ProfileMenuRow } from '../components/ProfileMenuRow';
import { AvatarUploadModal } from '../components/AvatarUploadModal';

export const ProfileHomeScreen: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to sign out of your VTU Student Account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)/login' as any);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <StudentProfileHeader
          user={user}
          onSettingsPress={() => router.push('/profile/preferences' as any)}
          onEditPress={() => setAvatarModalVisible(true)}
        />
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Academic Snapshot Card */}
        <AcademicIdentityCard
          semester={user.semester || 5}
          cgpa={user.currentCgpa || 8.74}
          scheme={user.scheme || '2022'}
          onPressEdit={() => router.push('/profile/edit' as any)}
        />

        {/* Section 1: Academic */}
        <SectionHeader title="Academic" />
        <ProfileMenuRow
          title="Academic Profile"
          subtitle="View Branch, Semester, Scheme & CGPA"
          badge={`${user.branch || 'CSE'} • Sem ${user.semester || 5}`}
          iconName="award"
          iconBg="#EEF2FF"
          iconColor="#0745E8"
          onPress={() => router.push('/profile/academic' as any)}
        />

        {/* Section 2: Study */}
        <SectionHeader title="Study & Downloads" />
        <ProfileMenuRow
          title="Saved & Offline"
          subtitle="Manage downloaded notes & bookmarked papers"
          iconName="download-cloud"
          iconBg="#D1FAE5"
          iconColor="#059669"
          onPress={() => router.push('/saved' as any)}
        />
        <ProfileMenuRow
          title="Notifications & Circulars"
          subtitle="VTU exam timetables & test alerts"
          iconName="bell"
          iconBg="#FEF3C7"
          iconColor="#D97706"
          onPress={() => router.push('/profile/preferences' as any)}
        />

        {/* Section 3: App */}
        <SectionHeader title="App Preferences" />
        <ProfileMenuRow
          title="Preferences & Theme"
          subtitle="Appearance, notifications & mobile data"
          iconName="sliders"
          iconBg="#F3E8FF"
          iconColor="#9333EA"
          onPress={() => router.push('/profile/preferences' as any)}
        />
        <ProfileMenuRow
          title="About VTU Super App"
          subtitle="Version v1.0.0, University disclaimer & Help"
          iconName="info"
          iconBg="#E0F2FE"
          iconColor="#0284C7"
          onPress={() => router.push('/profile/about' as any)}
        />

        {/* Section 4: Legal & Account */}
        <SectionHeader title="Legal & Account" />
        <ProfileMenuRow
          title="Privacy Policy"
          subtitle="How we protect your academic data"
          iconName="shield"
          iconBg="#F1F5F9"
          iconColor="#475569"
          onPress={() => router.push('/profile/about' as any)}
        />
        <ProfileMenuRow
          title="Terms of Service"
          subtitle="Usage guidelines for engineering students"
          iconName="file-text"
          iconBg="#F1F5F9"
          iconColor="#475569"
          onPress={() => router.push('/profile/about' as any)}
        />
        <ProfileMenuRow
          title="Sign Out of Account"
          subtitle="Log out from VTU Student Super App"
          iconName="log-out"
          iconBg="#FEE2E2"
          iconColor="#DC2626"
          onPress={handleLogout}
        />
      </ScrollView>

      {/* Avatar Upload Modal */}
      <AvatarUploadModal
        visible={avatarModalVisible}
        onClose={() => setAvatarModalVisible(false)}
      />
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
});
