import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Platform, ScrollView } from 'react-native';
import { Colors, Spacing, BorderRadius, Fonts } from '../constants/theme';
import CategorySelector from '../components/CategorySelector';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import AnswerFeedback from '../components/AnswerFeedback';
import ResultCard from '../components/ResultCard';
import { fetchQuestions } from '../services/api';
import { MaterialIcons } from '@expo/vector-icons';

export default function QuizScreen() {
  const [gameState, setGameState] = useState('category'); // 'category' | 'quiz' | 'result'
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  
  // Game session timer
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  // Load questions and start the quiz
  const handleStartQuiz = async (selectedCat) => {
    setCategory(selectedCat);
    const loadedQuestions = await fetchQuestions(selectedCat);
    
    setQuestions(loadedQuestions);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setTimer(0);
    setGameState('quiz');
    
    // Start game timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  // Option selected by player
  const handleSelectOption = (option) => {
    setSelectedAnswer(option);
    setShowFeedback(true);
    
    const isCorrect = option === questions[currentIdx].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  // Transition to next question or end quiz
  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Clear timer and go to result screen
      if (timerRef.current) clearInterval(timerRef.current);
      setGameState('result');
    }
  };

  // Exit quiz back to category selection
  const handleExitQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('category');
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (gameState === 'category') {
    return <CategorySelector onSelectCategory={handleStartQuiz} />;
  }

  if (gameState === 'result') {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <ResultCard
            score={score}
            total={questions.length}
            timeTaken={timer}
            category={category}
            onRestart={() => handleStartQuiz(category)}
            onChangeCategory={handleExitQuiz}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Background glow effects */}
      <View style={styles.glowOverlay} pointerEvents="none">
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />
      </View>

      {/* TopAppBar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={handleExitQuiz}>
          <MaterialIcons name="close" size={24} color={Colors.onSurfaceVariant} />
        </TouchableOpacity>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>🌍 {category}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Progress Tracker */}
        <ProgressBar current={currentIdx + 1} total={questions.length} />

        {/* Question Panel + Options */}
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          correctAnswer={currentQuestion?.correctAnswer}
          showFeedback={showFeedback}
          onSelectOption={handleSelectOption}
        />

        {/* Floating Answer Feedback Banner */}
        {showFeedback && (
          <AnswerFeedback isCorrect={selectedAnswer === currentQuestion?.correctAnswer} />
        )}
      </ScrollView>

      {/* Fixed Footer CTA Button */}
      <View style={styles.footer}>
        <View style={styles.footerInner}>
          <TouchableOpacity
            style={[
              styles.nextBtn,
              !showFeedback && styles.nextBtnDisabled,
            ]}
            onPress={handleNext}
            disabled={!showFeedback}
            activeOpacity={0.9}
          >
            <View style={styles.topGlassEdge} />
            <Text style={styles.nextBtnText}>
              {currentIdx + 1 < questions.length ? 'Question Suivante' : 'Voir les résultats'}
            </Text>
            <MaterialIcons name="arrow-forward" size={20} color={Colors.textWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.md,
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    top: '-15%',
    left: '-10%',
    width: '70%',
    height: '50%',
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(208, 188, 255, 0.08)',
    filter: Platform.OS === 'web' ? 'blur(100px)' : undefined,
  },
  glowBottom: {
    position: 'absolute',
    bottom: '-10%',
    right: '-10%',
    width: '60%',
    height: '45%',
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(16, 185, 129, 0.04)',
    filter: Platform.OS === 'web' ? 'blur(100px)' : undefined,
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
    zIndex: 10,
    ...Platform.select({
      ios: { paddingTop: 10 },
      android: { paddingTop: 0 },
    }),
  },
  closeBtn: {
    padding: 8,
    borderRadius: BorderRadius.full,
  },
  headerBadge: {
    backgroundColor: 'rgba(93, 3, 202, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(93, 3, 202, 0.8)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  headerBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    fontFamily: Fonts.body,
  },
  headerSpacer: {
    width: 40,
  },
  mainContent: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.md,
    paddingBottom: 110, // space for footer button
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
    zIndex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.sm,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  footerInner: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  nextBtn: {
    backgroundColor: Colors.primaryAccent,
    borderRadius: BorderRadius.xl,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  nextBtnDisabled: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    shadowOpacity: 0,
    elevation: 0,
  },
  topGlassEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  nextBtnText: {
    color: Colors.textWhite,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.display,
  },
});
