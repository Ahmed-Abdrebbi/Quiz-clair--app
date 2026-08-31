import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Colors, Spacing, BorderRadius, Fonts } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function ResultCard({ 
  score, 
  total, 
  timeTaken, 
  category, 
  onRestart, 
  onChangeCategory 
}) {
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const incorrect = total - score;

  // Format time taken (seconds to e.g. 1m 45s)
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  // Dynamic message based on score
  const getEncouragement = () => {
    const ratio = score / total;
    if (ratio >= 0.8) {
      return "Bravo ! Excellent travail ! Vos connaissances en " + category + " sont particulièrement solides.";
    } else if (ratio >= 0.5) {
      return "Bien joué ! Vous avez de bonnes bases en " + category + ". Encore un petit effort !";
    } else {
      return "Ne découragez pas ! Continuez à vous entraîner en " + category + " pour progresser.";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>🎉 Partie Terminée !</Text>
      </View>

      {/* Main Result Card */}
      <View style={styles.glassCard}>
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <MaterialIcons name="public" size={16} color={Colors.primaryAccent} />
          <Text style={styles.categoryText}>🌍 {category}</Text>
        </View>

        {/* Score circular meter */}
        <View style={styles.circleContainer}>
          {/* Inner radial backdrop glow */}
          <View style={styles.glowBackdrop} />
          {/* Outer circle track */}
          <View style={styles.circleBorder}>
            <Text style={styles.scoreText}>
              {score}
              <Text style={styles.scoreSlashText}>/{total}</Text>
            </Text>
            <View style={styles.percentBadge}>
              <Text style={styles.percentText}>{percent}% Précision</Text>
            </View>
          </View>
        </View>

        {/* Description text */}
        <Text style={styles.description}>{getEncouragement()}</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {/* Correct stats */}
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, styles.correctIconBg]}>
            <MaterialIcons name="check-circle" size={20} color={Colors.success} />
          </View>
          <Text style={styles.statValue}>{score}</Text>
          <Text style={styles.statLabel}>Correct</Text>
        </View>

        {/* Incorrect stats */}
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, styles.incorrectIconBg]}>
            <MaterialIcons name="cancel" size={20} color={Colors.error} />
          </View>
          <Text style={styles.statValue}>{incorrect}</Text>
          <Text style={styles.statLabel}>Erreurs</Text>
        </View>

        {/* Time stats */}
        <View style={styles.statCard}>
          <View style={[styles.statIconContainer, styles.timeIconBg]}>
            <MaterialIcons name="timer" size={20} color={Colors.secondary} />
          </View>
          <Text style={styles.statValue}>{formatTime(timeTaken)}</Text>
          <Text style={styles.statLabel}>Temps</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.restartBtn} 
          onPress={onRestart} 
          activeOpacity={0.9}
        >
          <MaterialIcons name="refresh" size={22} color={Colors.textWhite} />
          <Text style={styles.restartText}>🔄 Recommencer la partie</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.homeBtn} 
          onPress={onChangeCategory} 
          activeOpacity={0.8}
        >
          <MaterialIcons name="home" size={22} color={Colors.onSurface} />
          <Text style={styles.homeText}>🏠 Choisir une autre catégorie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingVertical: Spacing.sm,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: Fonts.display,
    fontWeight: 'bold',
    color: Colors.textWhite,
    textAlign: 'center',
    textShadowColor: 'rgba(208, 188, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  glassCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  glowBackdrop: {
    position: 'absolute',
    width: 140,
    height: 140,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderRadius: BorderRadius.full,
    filter: Platform.OS === 'web' ? 'blur(40px)' : undefined, // blur filter on web
  },
  categoryBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: Colors.primaryAccent,
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.md,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: Fonts.body,
    fontWeight: '600',
    color: Colors.primary,
  },
  circleContainer: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    position: 'relative',
  },
  circleBorder: {
    width: 164,
    height: 164,
    borderRadius: 82,
    borderWidth: 4,
    borderColor: Colors.success, // highlight circular track in green
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: Fonts.display,
    color: Colors.textWhite,
  },
  scoreSlashText: {
    fontSize: 18,
    color: 'rgba(218, 226, 253, 0.5)',
  },
  percentBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 6,
  },
  percentText: {
    fontSize: 11,
    fontFamily: Fonts.body,
    fontWeight: '600',
    color: Colors.success,
  },
  description: {
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 340,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.6)',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  correctIconBg: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  incorrectIconBg: {
    backgroundColor: 'rgba(255, 180, 171, 0.15)',
  },
  timeIconBg: {
    backgroundColor: 'rgba(211, 187, 255, 0.15)',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.display,
    color: Colors.textWhite,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: Fonts.body,
    color: Colors.onSurfaceVariant,
  },
  actions: {
    gap: 12,
  },
  restartBtn: {
    backgroundColor: Colors.primaryAccent,
    borderRadius: BorderRadius.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  restartText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontFamily: Fonts.body,
    fontWeight: '600',
  },
  homeBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: BorderRadius.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  homeText: {
    color: Colors.onSurface,
    fontSize: 16,
    fontFamily: Fonts.body,
    fontWeight: '600',
  },
});
