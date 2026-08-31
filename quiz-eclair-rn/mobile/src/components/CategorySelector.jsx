import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Colors, Spacing, BorderRadius, Fonts } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

const CATEGORIES = [
  {
    id: 'Culture Générale',
    title: 'Culture Générale',
    subtitle: 'Histoire, Géographie, Arts',
    questionsCount: '5 questions',
    icon: 'public',
  },
  {
    id: 'Logique',
    title: 'Logique',
    subtitle: 'Enigmes, Suites, Raisonnement',
    questionsCount: '5 questions',
    icon: 'extension',
  },
  {
    id: 'Divertissement',
    title: 'Divertissement',
    subtitle: 'Cinéma, Musique, Pop Culture',
    questionsCount: '5 questions',
    icon: 'movie',
  },
];

export default function CategorySelector({ onSelectCategory }) {
  const [selectedId, setSelectedId] = useState('Culture Générale');

  return (
    <View style={styles.container}>
      {/* TopAppBar */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="bolt" size={24} color={Colors.primaryAccent} />
          <Text style={styles.headerTitle}>Quiz Éclair</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Intro Hero Header */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Quiz Éclair</Text>
          <Text style={styles.heroSubtitle}>Réviser en quelques minutes, sans compte</Text>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Choisissez une catégorie pour commencer</Text>

        {/* Category List */}
        <View style={styles.listContainer}>
          {CATEGORIES.map((category) => {
            const isActive = selectedId === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.card,
                  isActive && styles.activeCard,
                ]}
                onPress={() => setSelectedId(category.id)}
                activeOpacity={0.85}
              >
                <View style={styles.cardLeft}>
                  <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                    <MaterialIcons 
                      name={category.icon} 
                      size={28} 
                      color={isActive ? Colors.primaryAccent : Colors.textMuted} 
                    />
                  </View>
                  <View style={styles.cardTexts}>
                    <Text style={[styles.cardTitle, isActive && styles.activeCardTitle]}>
                      {category.title}
                    </Text>
                    <Text style={styles.cardSubtitle}>{category.subtitle}</Text>
                  </View>
                </View>

                <View style={[styles.badge, isActive && styles.activeBadge]}>
                  <Text style={[styles.badgeText, isActive && styles.activeBadgeText]}>
                    {category.questionsCount}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => onSelectCategory(selectedId)}
          activeOpacity={0.9}
        >
          <Text style={styles.ctaText}>Commencer le Quiz</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation (Mocked just like Stitch Screen 3) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <MaterialIcons name="explore" size={24} color={Colors.primaryAccent} />
          <Text style={styles.navTextActive}>Explorer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="psychology" size={24} color={Colors.textMuted} />
          <Text style={styles.navText}>Défis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="leaderboard" size={24} color={Colors.textMuted} />
          <Text style={styles.navText}>Classement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color={Colors.textMuted} />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 64,
    backgroundColor: 'rgba(11, 19, 38, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(73, 68, 84, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
    ...Platform.select({
      ios: { paddingTop: 10 },
      android: { paddingTop: 0 },
    }),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.display,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  headerSpacer: {
    width: 24,
  },
  scrollContent: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.md,
    paddingBottom: 100, // extra padding for bottom tab bar
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: Fonts.display,
    color: Colors.textWhite,
    marginBottom: Spacing.base,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.display,
    fontWeight: '600',
    color: Colors.textWhite,
    marginBottom: Spacing.sm,
  },
  listContainer: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  card: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeCard: {
    borderColor: Colors.primaryAccent,
    shadowColor: Colors.primaryAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  activeIconContainer: {
    borderColor: Colors.primaryAccent,
  },
  cardTexts: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.display,
    color: Colors.textWhite,
    marginBottom: 2,
  },
  activeCardTitle: {
    color: Colors.primaryAccent,
  },
  cardSubtitle: {
    fontSize: 13,
    fontFamily: Fonts.body,
    color: Colors.textMuted,
  },
  badge: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 1,
    borderColor: Colors.primaryAccent,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  activeBadge: {
    backgroundColor: Colors.primaryAccent,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: Fonts.body,
  },
  activeBadgeText: {
    color: Colors.textWhite,
  },
  ctaButton: {
    backgroundColor: Colors.primaryAccent,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
    marginTop: Spacing.sm,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.body,
    color: Colors.textWhite,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: 'rgba(23, 31, 51, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(73, 68, 84, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.xs,
  },
  navItemActive: {
    backgroundColor: 'rgba(93, 3, 202, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  navTextActive: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryAccent,
    fontFamily: Fonts.body,
  },
  navText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontFamily: Fonts.body,
    marginTop: 2,
  },
});
