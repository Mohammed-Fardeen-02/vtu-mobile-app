import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuthStore } from '@/store';

interface AvatarUploadModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
];

export const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({
  visible,
  onClose,
}) => {
  const { user, updateProfile } = useAuthStore();
  const [selectedUri, setSelectedUri] = useState<string>(user?.avatarUrl || PRESET_AVATARS[0]);
  const [customInput, setCustomInput] = useState<string>('');

  const handleSave = () => {
    const finalUrl = customInput.trim() || selectedUri;
    updateProfile({ avatarUrl: finalUrl });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sheetContainer}>
          <View style={styles.handleBar} />

          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Update Profile Picture</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Active Avatar Preview */}
          <View style={styles.previewBox}>
            <Image
              source={{ uri: customInput.trim() || selectedUri }}
              style={styles.previewAvatar}
            />
            <Text style={styles.previewName}>{user?.name || 'Student Avatar'}</Text>
          </View>

          {/* Presets Grid */}
          <Text style={styles.sectionLabel}>CHOOSE FROM PRESETS</Text>
          <View style={styles.presetsGrid}>
            {PRESET_AVATARS.map((url, idx) => {
              const isSel = selectedUri === url && !customInput;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.8}
                  style={[styles.presetItem, isSel && styles.presetItemSel]}
                  onPress={() => {
                    setSelectedUri(url);
                    setCustomInput('');
                  }}
                >
                  <Image source={{ uri: url }} style={styles.presetImage} />
                  {isSel && (
                    <View style={styles.checkBadge}>
                      <Feather name="check" size={12} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Custom URL Option */}
          <Text style={styles.sectionLabel}>OR PASTE PHOTO URL</Text>
          <View style={styles.inputWrapper}>
            <Feather name="link" size={16} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.input}
              placeholder="https://example.com/avatar.jpg"
              placeholderTextColor="#94A3B8"
              value={customInput}
              onChangeText={setCustomInput}
            />
          </View>

          <TouchableOpacity activeOpacity={0.9} style={styles.saveBtn} onPress={handleSave}>
            <Feather name="camera" size={18} color="#FFFFFF" />
            <Text style={styles.saveBtnText}>Save Profile Picture</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#0745E8',
    marginBottom: 6,
  },
  previewName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'center',
    marginBottom: 20,
  },
  presetItem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  presetItemSel: {
    borderColor: '#0745E8',
  },
  presetImage: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#0745E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  saveBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#0745E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
