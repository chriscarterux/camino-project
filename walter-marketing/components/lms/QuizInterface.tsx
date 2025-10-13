"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single-choice' | 'multiple-choice' | 'open-ended';
  options?: string[];
  correctAnswer?: string | string[];
}

interface QuizInterfaceProps {
  questions: QuizQuestion[];
  onSubmit: (answers: Record<string, any>) => Promise<void>;
  onComplete?: () => void;
}

export function QuizInterface({ questions, onSubmit, onComplete }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswered = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (answer: any) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmitQuiz();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(answers);

      // Calculate score (simplified)
      let correct = 0;
      questions.forEach((q) => {
        if (q.correctAnswer && answers[q.id] === q.correctAnswer) {
          correct++;
        }
      });

      setScore(Math.round((correct / questions.length) * 100));
      setShowResults(true);
    } catch (error) {
      console.error('Submit quiz error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults) {
    const passed = score >= 70;

    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
          passed ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {passed ? (
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          ) : (
            <XCircle className="h-12 w-12 text-red-600" />
          )}
        </div>

        <h2 className="text-3xl font-bold mb-4">
          {passed ? 'Great work!' : 'Keep practicing'}
        </h2>

        <div className="text-5xl font-bold text-[#E2C379] mb-4">
          {score}%
        </div>

        <p className="text-muted-foreground mb-8">
          {passed
            ? 'You've demonstrated understanding of this material. Continue to the next lesson.'
            : 'Review the lesson and try again when you're ready.'}
        </p>

        {passed && onComplete && (
          <Button onClick={onComplete} className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]">
            Continue to Next Lesson
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}

        {!passed && (
          <Button
            onClick={() => {
              setShowResults(false);
              setCurrentQuestionIndex(0);
              setAnswers({});
            }}
            variant="outline"
          >
            Review Lesson
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E2C379] transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card border rounded-2xl p-8 mb-6">
        <h3 className="text-xl font-bold mb-6">{currentQuestion.question}</h3>

        {/* Single/Multiple Choice */}
        {currentQuestion.type !== 'open-ended' && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentQuestion.type === 'single-choice'
                ? answers[currentQuestion.id] === option
                : (answers[currentQuestion.id] || []).includes(option);

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (currentQuestion.type === 'single-choice') {
                      handleAnswer(option);
                    } else {
                      const current = answers[currentQuestion.id] || [];
                      if (current.includes(option)) {
                        handleAnswer(current.filter((a: string) => a !== option));
                      } else {
                        handleAnswer([...current, option]);
                      }
                    }
                  }}
                  className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                    isSelected
                      ? 'border-[#E2C379] bg-[#E2C379]/10'
                      : 'border-muted hover:border-[#E2C379]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#E2C379] bg-[#E2C379]' : 'border-muted-foreground'
                    }`}>
                      {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Open-ended */}
        {currentQuestion.type === 'open-ended' && (
          <textarea
            className="w-full min-h-[200px] p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#E2C379] focus:border-transparent"
            placeholder="Type your answer here..."
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={!hasAnswered || isSubmitting}
          className="bg-[#E2C379] hover:bg-[#E2C379]/90 text-[#2D2F33]"
        >
          {isLastQuestion ? (isSubmitting ? 'Submitting...' : 'Submit Quiz') : 'Next Question'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
