import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Fonts } from '../constants/theme';

export default function ProgressBar({ current, total }) {
  const percent = total > 0 ? Math.min(100, Math.max(0, Math.round((current / total) * 100))) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.progressText}>
          Question {current} sur {total}
        </Text>
        <Text style={styles.percentText}>{percent}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]}>
          {percent > 0 && <View style={styles.leadingGlow} />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    fontFamily: Fonts.body,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: Colors.onSurfaceVariant,
  },
  percentText: {
    fontSize: 14,
    fontFamily: Fonts.body,
    fontWeight: 'bold',
    color: Colors.primaryAccent,
  },
  track: {
    width: '100%',
    height: 10,
    backgroundColor: '#1E293B',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.primaryAccent,
    borderRadius: BorderRadius.full,
    position: 'relative',
  },
  leadingGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: BorderRadius.full,
  },
});
