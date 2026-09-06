import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { registerSchema, RegisterFormData } from '../validation/auth.schema';
import { useAuthStore } from '@/store';

export const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [step, setStep] = useState<number>(1);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: 'Fardeen',
      email: 'youremail@gmail.com',
      password: 'password123',
      usn: '1CS21CS001',
      branch: 'CSE',
      scheme: '2022',
    },
  });

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const onSubmit = (data: RegisterFormData) => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setAuth(
      {
        id: '1',
        name: data.name,
        email: data.email,
        usn: data.usn,
        branch: data.branch,
        scheme: data.scheme,
      },
      'mock_token_123'
    );
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0953E8" translucent />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Royal Blue Header */}
          <LinearGradient
            colors={['#0953E8', '#0732B8', '#03176B']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.topHeader}
          >
            <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
              {/* Back Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.backButton}
                onPress={handleBackStep}
              >
                <Feather name="chevron-left" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Stepper Indicator */}
              <View style={styles.stepperContainer}>
                <View style={styles.stepperRow}>
                  <View style={[styles.stepCircle, step >= 1 && styles.activeStepCircle]}>
                    <Text style={[styles.stepNumber, step >= 1 && styles.activeStepNumber]}>1</Text>
                  </View>
                  <View style={[styles.stepLine, step >= 2 && styles.activeStepLine]} />
                  <View style={[styles.stepCircle, step >= 2 && styles.activeStepCircle]}>
                    <Text style={[styles.stepNumber, step >= 2 && styles.activeStepNumber]}>2</Text>
                  </View>
                  <View style={[styles.stepLine, step >= 3 && styles.activeStepLine]} />
                  <View style={[styles.stepCircle, step >= 3 && styles.activeStepCircle]}>
                    <Text style={[styles.stepNumber, step >= 3 && styles.activeStepNumber]}>3</Text>
                  </View>
                </View>

                <View style={styles.labelsRow}>
                  <Text style={[styles.stepLabel, step >= 1 && styles.activeStepLabel]}>Personal Info</Text>
                  <Text style={[styles.stepLabel, step >= 2 && styles.activeStepLabel]}>Academic Info</Text>
                  <Text style={[styles.stepLabel, step >= 3 && styles.activeStepLabel]}>Complete</Text>
                </View>
              </View>
            </SafeAreaView>
          </LinearGradient>

          {/* Bottom Curved White Sheet */}
          <View style={styles.whiteSheet}>
            {/* Center Logo */}
            <View style={styles.logoWrapper}>
              <Image
                source={require('@/../assets/vtu_logo.png')}
                style={styles.logoImage}
                contentFit="contain"
              />
            </View>

            {/* Headline & Subtitle */}
            <Text style={styles.title}>Let's Get Started! 🚀</Text>
            <Text style={styles.subtitle}>
              Create your account to unlock a world of learning.
            </Text>

            {/* Form Section Header */}
            <Text style={styles.sectionHeader}>
              {step === 1 ? 'Personal Information' : step === 2 ? 'Academic Details' : 'Finalize Profile'}
            </Text>

            {/* Form Inputs */}
            <View style={styles.formGroup}>
              {step === 1 && (
                <>
                  {/* Full Name */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>Full Name</Text>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field: { onChange, value } }) => (
                        <View style={styles.inputBox}>
                          <Feather name="user" size={18} color="#64748B" style={styles.inputIcon} />
                          <TextInput
                            style={styles.input}
                            placeholder="Fardeen"
                            placeholderTextColor="#94A3B8"
                            value={value}
                            onChangeText={onChange}
                          />
                        </View>
                      )}
                    />
                    {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                  </View>

                  {/* Email Address */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>Email Address</Text>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, value } }) => (
                        <View style={styles.inputBox}>
                          <Feather name="mail" size={18} color="#64748B" style={styles.inputIcon} />
                          <TextInput
                            style={styles.input}
                            placeholder="youremail@gmail.com"
                            placeholderTextColor="#94A3B8"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                          />
                        </View>
                      )}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                  </View>

                  {/* Mobile Number */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>Mobile Number</Text>
                    <View style={styles.inputBox}>
                      <Feather name="phone" size={18} color="#64748B" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="+91 98765 43210"
                        placeholderTextColor="#94A3B8"
                        keyboardType="phone-pad"
                      />
                    </View>
                  </View>

                  {/* Date of Birth */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>Date of Birth</Text>
                    <View style={styles.inputBox}>
                      <Feather name="calendar" size={18} color="#64748B" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="DD / MM / YYYY"
                        placeholderTextColor="#94A3B8"
                      />
                      <Feather name="calendar" size={18} color="#94A3B8" />
                    </View>
                  </View>
                </>
              )}

              {step === 2 && (
                <>
                  {/* USN Number */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>USN Number</Text>
                    <Controller
                      control={control}
                      name="usn"
                      render={({ field: { onChange, value } }) => (
                        <View style={styles.inputBox}>
                          <Feather name="credit-card" size={18} color="#64748B" style={styles.inputIcon} />
                          <TextInput
                            style={styles.input}
                            placeholder="1CS21CS001"
                            placeholderTextColor="#94A3B8"
                            value={value}
                            onChangeText={onChange}
                            autoCapitalize="characters"
                          />
                        </View>
                      )}
                    />
                  </View>

                  {/* Branch */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>Engineering Branch</Text>
                    <Controller
                      control={control}
                      name="branch"
                      render={({ field: { onChange, value } }) => (
                        <View style={styles.inputBox}>
                          <Feather name="book-open" size={18} color="#64748B" style={styles.inputIcon} />
                          <TextInput
                            style={styles.input}
                            placeholder="Computer Science & Engg (CSE)"
                            placeholderTextColor="#94A3B8"
                            value={value}
                            onChangeText={onChange}
                          />
                        </View>
                      )}
                    />
                  </View>
                </>
              )}

              {step === 3 && (
                <>
                  {/* Password */}
                  <View style={styles.inputContainer}>
                    <Text style={styles.fieldLabel}>Set Password</Text>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, value } }) => (
                        <View style={styles.inputBox}>
                          <Feather name="lock" size={18} color="#64748B" style={styles.inputIcon} />
                          <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#94A3B8"
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                          />
                        </View>
                      )}
                    />
                  </View>
                </>
              )}

              {/* Continue Action Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.continueButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.continueText}>
                  {step === 3 ? 'Complete Registration' : 'Continue'}
                </Text>
              </TouchableOpacity>

              {/* Already have an account footer */}
              <View style={styles.footerRow}>
                <Text style={styles.footerNotice}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#0953E8',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  headerSafeArea: {
    width: '100%',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  stepperContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStepCircle: {
    backgroundColor: '#FFFFFF',
  },
  stepNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  activeStepNumber: {
    color: '#0745E8',
  },
  stepLine: {
    width: 50,
    height: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  activeStepLine: {
    backgroundColor: '#FFFFFF',
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginTop: 4,
  },
  stepLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  activeStepLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logoImage: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 18,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  formGroup: {
    gap: 14,
  },
  inputContainer: {
    gap: 5,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
  },
  continueButton: {
    backgroundColor: '#0745E8',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0745E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 6,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  footerNotice: {
    fontSize: 13,
    color: '#64748B',
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0745E8',
  },
});
