import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { storageService } from '@/infrastructure/storage/storage.service';
import { useAuthStore } from '@/store';

const { width } = Dimensions.get('window');

const ONBOARDING_SLIDES = [
  {
    id: '1',
    title: 'Your Complete VTU\nAcademic Companion',
    subtitle: 'Notes, Papers, Calculators, Community & More in one single Super App.',
  },
  {
    id: '2',
    title: 'Verified Notes &\nQuestion Papers',
    subtitle: 'Access module-wise notes, handwritten PDFs & previous years question papers.',
  },
  {
    id: '3',
    title: 'SGPA, CGPA &\nCommunity Rewards',
    subtitle: 'Calculate grades instantly, track attendance & earn VTU coins by sharing notes.',
  },
];

export const OnboardingScreen: React.FC = () => {
  const router = useRouter();
  const setOnboarded = useAuthStore((state) => state.setOnboarded);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reanimated Float Bobbing Animations for 5 Pastel Badges
  const float1 = useSharedValue(0);
  const float2 = useSharedValue(0);
  const float3 = useSharedValue(0);

  useEffect(() => {
    float1.value = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    float2.value = withRepeat(
      withTiming(1, { duration: 2700, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    float3.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const badgeStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: float1.value * -12 }],
  }));

  const badgeStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: float2.value * -10 }],
  }));

  const badgeStyle3 = useAnimatedStyle(() => ({
    transform: [{ translateY: float3.value * -14 }],
  }));

  const handleNext = async () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      await handleFinishOnboarding();
    }
  };

  const handleFinishOnboarding = async () => {
    await storageService.setItem('vtu_onboarded', true);
    setOnboarded(true);
    router.replace('/(auth)/welcome');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header with Skip Button */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.skipButton}
            onPress={handleFinishOnboarding}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Center 3D Student Illustration with 5 Floating Pastel 3D Badges */}
        <View style={styles.illustrationContainer}>
          {/* Main 3D Student Illustration */}
          <Image
            source={require('@/../assets/Student Illustration.png')}
            style={styles.studentImage}
            contentFit="contain"
            priority="high"
          />

          {/* Floating Badge 1: Book (Top Left) */}
          <Animated.View style={[styles.floatingBadge, styles.badgeTopLeft, badgeStyle1]}>
            <LinearGradient
              colors={['#F3E8FF', '#DDD6FE']}
              style={styles.badgeGradient}
            >
              <Feather name="book-open" size={20} color="#7C3AED" />
            </LinearGradient>
          </Animated.View>

          {/* Floating Badge 2: Papers (Top Right) */}
          <Animated.View style={[styles.floatingBadge, styles.badgeTopRight, badgeStyle2]}>
            <LinearGradient
              colors={['#CCFBF1', '#99F6E4']}
              style={styles.badgeGradient}
            >
              <Feather name="file-text" size={20} color="#0D9488" />
            </LinearGradient>
          </Animated.View>

          {/* Floating Badge 3: Notes (Mid Left) */}
          <Animated.View style={[styles.floatingBadge, styles.badgeMidLeft, badgeStyle3]}>
            <LinearGradient
              colors={['#DBEAFE', '#BFDBFE']}
              style={styles.badgeGradient}
            >
              <Feather name="edit-3" size={20} color="#2563EB" />
            </LinearGradient>
          </Animated.View>

          {/* Floating Badge 4: Calculator (Mid Right) */}
          <Animated.View style={[styles.floatingBadge, styles.badgeMidRight, badgeStyle1]}>
            <LinearGradient
              colors={['#DCFCE7', '#BBF7D0']}
              style={styles.badgeGradient}
            >
              <Feather name="cpu" size={20} color="#16A34A" />
            </LinearGradient>
          </Animated.View>

          {/* Floating Badge 5: Reward Trophy (Bottom Center) */}
          <Animated.View style={[styles.floatingBadge, styles.badgeBottomCenter, badgeStyle2]}>
            <LinearGradient
              colors={['#FEF3C7', '#FDE68A']}
              style={styles.badgeGradient}
            >
              <Feather name="award" size={20} color="#D97706" />
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Text Slide Carousel */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{ONBOARDING_SLIDES[currentSlide].title}</Text>
          <Text style={styles.subtitle}>{ONBOARDING_SLIDES[currentSlide].subtitle}</Text>
        </View>

        {/* Pagination Dots & Next/Get Started Button */}
        <View style={styles.bottomSection}>
          <View style={styles.dotsRow}>
            {ONBOARDING_SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentSlide === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primaryButton}
            onPress={handleNext}
          >
            <Text style={styles.primaryButtonText}>
              {currentSlide === ONBOARDING_SLIDES.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
  },
  topHeader: {
    alignItems: 'flex-end',
    height: 40,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  skipText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
  illustrationContainer: {
    height: width * 0.72,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 10,
  },
  studentImage: {
    width: width * 0.58,
    height: width * 0.58,
  },
  floatingBadge: {
    position: 'absolute',
    borderRadius: 22,
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  badgeGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTopLeft: {
    top: 4,
    left: 20,
  },
  badgeTopRight: {
    top: 10,
    right: 24,
  },
  badgeMidLeft: {
    top: '48%',
    left: 8,
  },
  badgeMidRight: {
    top: '45%',
    right: 12,
  },
  badgeBottomCenter: {
    bottom: 2,
    alignSelf: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#0745E8',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#CBD5E1',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#0745E8',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
