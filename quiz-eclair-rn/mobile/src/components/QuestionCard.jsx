import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius, Fonts } from '../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function QuestionCard({ 
  question, 
  selectedAnswer, 
  correctAnswer, 
  showFeedback, 
  onSelectOption 
}) {
  if (!question) return null;

  return (
    <View style={styles.container}>
      {/* Question Panel */}
      <View style={styles.questionPanel}>
        <View style={styles.glassOverlay} />
        <View style={styles.topGlassEdge} />
        <Text style={styles.questionText}>{question.text}</Text>
      </View>

      {/* Options List */}
      <View style={styles.optionsList}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = correctAnswer === option;
          
          let cardStyle = styles.optionCard;
          let textStyle = styles.optionText;
          let iconName = 'radio-button-unchecked';
          let iconColor = Colors.outline;

          if (showFeedback) {
            if (isCorrect) {
              cardStyle = [styles.optionCard, styles.correctCard];
              textStyle = [styles.optionText, styles.correctText];
              iconName = 'check-circle';
              iconColor = Colors.success;
            } else if (isSelected) {
              cardStyle = [styles.optionCard, styles.incorrectCard];
              textStyle = [styles.optionText, styles.incorrectText];
              iconName = 'cancel';
              iconColor = Colors.error;
            } else {
              cardStyle = [styles.optionCard, styles.disabledCard];
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={cardStyle}
              onPress={() => !showFeedback && onSelectOption(option)}
              disabled={showFeedback}
              activeOpacity={0.8}
            >
              <Text style={textStyle}>{option}</Text>
              <MaterialIcons name={iconName} size={22} color={iconColor} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: Spacing.md,
  },
  questionPanel: {
    backgroundColor: '#1E293B',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    minHeight: 120,
    justifyContent: 'center',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(22, 30, 46, 0.4)', // simulate gradient
  },
  topGlassEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  questionText: {
    fontSize: 20,
    fontFamily: Fonts.display,
    fontWeight: '600',
    color: Colors.textWhite,
    lineHeight: 28,
    zIndex: 1,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: BorderRadius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.onSurface,
    flex: 1,
    paddingRight: Spacing.sm,
  },
  correctCard: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success,
    borderWidth: 2,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  correctText: {
    fontWeight: 'bold',
    color: Colors.textWhite,
  },
  incorrectCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  incorrectText: {
    fontWeight: 'bold',
    color: Colors.textWhite,
  },
  disabledCard: {
    opacity: 0.6,
  },
});
