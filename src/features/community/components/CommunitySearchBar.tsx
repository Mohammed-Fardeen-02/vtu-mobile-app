import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CommunitySearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onPressFilter?: () => void;
  onFocus?: () => void;
}

export const CommunitySearchBar: React.FC<CommunitySearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search community notes, topics, or authors...',
  onPressFilter,
  onFocus,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Feather name="search" size={18} color="#64748B" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          onFocus={onFocus}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')}>
            <Feather name="x-circle" size={16} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {onPressFilter && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterBtn}
          onPress={onPressFilter}
        >
          <Feather name="sliders" size={18} color="#0745E8" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    padding: 0,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
});
