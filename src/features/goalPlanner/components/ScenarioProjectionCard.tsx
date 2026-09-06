import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProjectionScenario } from '../types/goalPlanner.types';

interface ScenarioProjectionCardProps {
  scenarios: ProjectionScenario[];
  targetCgpa: number;
}

export const ScenarioProjectionCard: React.FC<ScenarioProjectionCardProps> = ({
  scenarios,
  targetCgpa,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>3-Scenario Graduation Projections</Text>
      <Text style={styles.sectionSub}>Projected final CGPA under different performance levels</Text>

      <View style={styles.cardList}>
        {scenarios.map((sc, index) => {
          const isGoal = sc.name === 'Goal Scenario';
          const isConservative = sc.name === 'Conservative';

          return (
            <View
              key={sc.name}
              style={[
                styles.scenarioCard,
                isGoal && styles.scenarioCardGoal,
                isConservative && styles.scenarioCardCons,
              ]}
            >
              <View style={styles.topRow}>
                <View style={styles.titleRow}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: isGoal ? '#EEF2FF' : isConservative ? '#F1F5F9' : '#FEF3C7' },
                    ]}
                  >
                    <Feather
                      name={isGoal ? 'target' : isConservative ? 'minus-circle' : 'trending-up'}
                      size={16}
                      color={isGoal ? '#0745E8' : isConservative ? '#64748B' : '#D97706'}
                    />
                  </View>
                  <Text style={styles.scenarioName}>{sc.name}</Text>
                </View>

                <View style={styles.projectedBadge}>
                  <Text style={[styles.projectedVal, isGoal && { color: '#0745E8' }]}>
                    {sc.projectedFinalCgpa.toFixed(2)} CGPA
                  </Text>
                </View>
              </View>

              <Text style={styles.descText}>{sc.description}</Text>

              <View style={styles.footerRow}>
                <Text style={styles.assumedText}>Assumed SGPA: {sc.assumedSgpa.toFixed(2)}</Text>
                <Text
                  style={[
                    styles.diffText,
                    sc.differenceFromTarget >= 0
                      ? { color: '#059669' }
                      : { color: '#EF4444' },
                  ]}
                >
                  {sc.differenceFromTarget === 0
                    ? 'Hits Target Goal'
                    : `${sc.differenceFromTarget > 0 ? '+' : ''}${sc.differenceFromTarget.toFixed(2)} vs Goal`}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  sectionSub: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  cardList: {
    gap: 12,
  },
  scenarioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scenarioCardGoal: {
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
  },
  scenarioCardCons: {
    backgroundColor: '#F8FAFC',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scenarioName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  projectedBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  projectedVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  descText: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.6)',
    paddingTop: 8,
  },
  assumedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  diffText: {
    fontSize: 11,
    fontWeight: '800',
  },
});
