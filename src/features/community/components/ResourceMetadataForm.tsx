import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { UploadFormData } from '../types/community.types';
import { SubjectSelector } from './SubjectSelector';
import { UnitSelector } from './UnitSelector';
import { SchemeSelector } from './SchemeSelector';
import { ResourceTypeSelector } from './ResourceTypeSelector';

interface ResourceMetadataFormProps {
  formData: UploadFormData;
  onChangeData: (data: Partial<UploadFormData>) => void;
}

export const ResourceMetadataForm: React.FC<ResourceMetadataFormProps> = ({
  formData,
  onChangeData,
}) => {
  return (
    <View style={styles.formContainer}>
      {/* Title Field */}
      <Text style={styles.label}>Resource Title *</Text>
      <TextInput
        style={styles.input}
        value={formData.title}
        onChangeText={(text) => onChangeData({ title: text })}
        placeholder="e.g. CN Module 1 & 2 Complete Lecture Notes (Handwritten)"
        placeholderTextColor="#94A3B8"
      />

      {/* Subject Selector */}
      <SubjectSelector
        selectedCode={formData.subjectCode}
        onSelectSubject={(code, name) => onChangeData({ subjectCode: code, subjectName: name })}
      />

      {/* Unit Selector */}
      <UnitSelector
        selectedUnit={formData.unitNumber}
        onSelectUnit={(unit) => onChangeData({ unitNumber: unit })}
      />

      {/* Scheme Selector */}
      <SchemeSelector
        selectedScheme={formData.scheme}
        onSelectScheme={(sch) => onChangeData({ scheme: sch })}
      />

      {/* Resource Type Selector */}
      <ResourceTypeSelector
        selectedType={formData.resourceType}
        onSelectType={(type) => onChangeData({ resourceType: type })}
      />

      {/* Description Field */}
      <Text style={styles.label}>Description & Key Highlights</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={formData.description}
        onChangeText={(text) => onChangeData({ description: text })}
        placeholder="Brief description of what topics, diagrams or solved problems are included in this document..."
        placeholderTextColor="#94A3B8"
        multiline
        numberOfLines={4}
      />

      {/* Tags Field */}
      <Text style={styles.label}>Tags (Comma Separated)</Text>
      <TextInput
        style={styles.input}
        value={formData.tags}
        onChangeText={(text) => onChangeData({ tags: text })}
        placeholder="e.g. VTU, Handwritten, OSI Model, Solved Problems"
        placeholderTextColor="#94A3B8"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingVertical: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 14,
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
});
