import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, BorderRadius, Fonts } from '../constants/theme';

export default function AnswerFeedback({ isCorrect }) {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Set up loop bounce animation matching Tailwind bounce
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -8,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    bounceAnimation.start();
    return () => bounceAnimation.stop();
  }, [bounceAnim]);

  const bannerStyle = isCorrect ? styles.correctBanner : styles.incorrectBanner;
  const bannerText = isCorrect ? '✓ Bonne réponse ! +1 Point' : '✗ Mauvaise réponse !';

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: bounceAnim }] }]}>
      <View style={bannerStyle}>
        <Text style={styles.text}>{bannerText}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
    marginBottom: 8,
    zIndex: 20,
  },
  correctBanner: {
    backgroundColor: Colors.success,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  incorrectBanner: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: Fonts.body,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
