/**
 * LMS Progress Tracking
 * Handles lesson completion, quiz submissions, and progress calculations
 */

import { frappeClient } from './frappe-client';

export interface LessonProgress {
  lesson: string;
  course: string;
  member: string;
  status: 'Not Started' | 'In Progress' | 'Complete';
  last_activity: string;
}

export interface QuizSubmission {
  name: string;
  quiz: string;
  member: string;
  score: number;
  percentage: number;
  status: 'Pass' | 'Fail';
}

/**
 * Mark lesson as complete
 */
export async function completelesson(
  lessonName: string,
  userEmail: string,
  userToken: string
): Promise<void> {
  try {
    await frappeClient.call(
      'lms.lms.utils.save_progress',
      {
        lesson: lessonName,
        member: userEmail,
      },
      userToken
    );
  } catch (error) {
    console.error('Complete lesson error:', error);
    throw error;
  }
}

/**
 * Get user's lesson progress for a course
 */
export async function getCourseProgress(
  courseName: string,
  userEmail: string,
  userToken: string
): Promise<{ completedLessons: number; totalLessons: number; percentage: number }> {
  try {
    const response = await frappeClient.call(
      'lms.lms.utils.get_course_progress',
      {
        course: courseName,
        member: userEmail,
      },
      userToken
    );

    return response.message || { completedLessons: 0, totalLessons: 0, percentage: 0 };
  } catch (error) {
    console.error('Get progress error:', error);
    return { completedLessons: 0, totalLessons: 0, percentage: 0 };
  }
}

/**
 * Submit quiz
 */
export async function submitQuiz(
  quizId: string,
  answers: Record<string, any>,
  userEmail: string,
  userToken: string
): Promise<QuizSubmission> {
  try {
    const response = await frappeClient.createDoc(
      'LMS Quiz Submission',
      {
        quiz: quizId,
        member: userEmail,
        result: answers,
      },
      userToken
    );

    return response.data;
  } catch (error) {
    console.error('Submit quiz error:', error);
    throw error;
  }
}

/**
 * Get quiz results for user
 */
export async function getQuizResults(
  quizId: string,
  userEmail: string,
  userToken: string
): Promise<QuizSubmission | null> {
  try {
    const response = await frappeClient.getDocList(
      'LMS Quiz Submission',
      ['name', 'score', 'percentage', 'status'],
      [
        ['quiz', '=', quizId],
        ['member', '=', userEmail],
      ],
      userToken
    );

    const submissions = response.data || [];
    return submissions.length > 0 ? submissions[0] : null;
  } catch (error) {
    console.error('Get quiz results error:', error);
    return null;
  }
}

/**
 * Get all completed lessons for a user in a course
 */
export async function getCompletedLessons(
  courseName: string,
  userEmail: string,
  userToken: string
): Promise<string[]> {
  try {
    const response = await frappeClient.call(
      'lms.lms.utils.get_completed_lessons',
      {
        course: courseName,
        member: userEmail,
      },
      userToken
    );

    return response.message || [];
  } catch (error) {
    console.error('Get completed lessons error:', error);
    return [];
  }
}
