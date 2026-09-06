import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors } from '@/core/theme';

interface CardProps extends ViewProps {
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  bordered = true,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.card,
        bordered && styles.bordered,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.darkCard,
    borderRadius: 16,
    padding: 16,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.background.darkCardBorder,
  },
});
