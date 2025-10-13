import { frappeClient } from './frappe-client';

export interface Course {
  name: string;
  title: string;
  short_introduction: string;
  description: string;
  image?: string;
  video_link?: string;
  published: boolean;
  paid_course: boolean;
  course_price?: number;
  currency?: string;
  enable_certification: boolean;
  chapters?: Chapter[];
  enrollments?: number;
  lessons?: number;
}

export interface Chapter {
  name: string;
  title: string;
  course: string;
  idx: number;
  lessons?: Lesson[];
}

export interface Lesson {
  name: string;
  title: string;
  course: string;
  chapter: string;
  body?: string;
  youtube?: string;
  quiz_id?: string;
  include_in_preview: boolean;
  idx: number;
}

export interface LMSEnrollment {
  name: string;
  member: string;
  course: string;
  batch?: string;
  progress: number;
  enrollment_date: string;
}

/**
 * Fetch all published courses
 */
export async function getCourses(userToken?: string): Promise<Course[]> {
  const response = await frappeClient.getDocList(
    'LMS Course',
    ['name', 'title', 'short_introduction', 'image', 'published', 'paid_course'],
    [['published', '=', 1]],
    userToken
  );

  return response.data || [];
}

/**
 * Fetch single course with full details
 */
export async function getCourse(courseName: string, userToken?: string): Promise<Course> {
  const course = await frappeClient.getDoc('LMS Course', courseName, userToken);

  // Fetch chapters with lessons
  if (course.data) {
    const chapters = await getCourseChapters(courseName, userToken);
    course.data.chapters = chapters;
  }

  return course.data;
}

/**
 * Fetch course chapters
 */
export async function getCourseChapters(
  courseName: string,
  userToken?: string
): Promise<Chapter[]> {
  const response = await frappeClient.getDocList(
    'Course Chapter',
    ['name', 'title', 'course', 'idx'],
    [['course', '=', courseName]],
    userToken
  );

  const chapters = response.data || [];

  // Fetch lessons for each chapter
  for (const chapter of chapters) {
    chapter.lessons = await getChapterLessons(chapter.name, userToken);
  }

  return chapters.sort((a, b) => a.idx - b.idx);
}

/**
 * Fetch lessons for a chapter
 */
export async function getChapterLessons(
  chapterName: string,
  userToken?: string
): Promise<Lesson[]> {
  const response = await frappeClient.getDocList(
    'Course Lesson',
    ['name', 'title', 'course', 'chapter', 'youtube', 'include_in_preview', 'idx'],
    [['chapter', '=', chapterName]],
    userToken
  );

  const lessons = response.data || [];
  return lessons.sort((a, b) => a.idx - b.idx);
}

/**
 * Fetch single lesson with full content
 */
export async function getLesson(lessonName: string, userToken?: string): Promise<Lesson> {
  const lesson = await frappeClient.getDoc('Course Lesson', lessonName, userToken);
  return lesson.data;
}

/**
 * Enroll user in a course
 */
export async function enrollInCourse(
  courseName: string,
  userEmail: string,
  userToken?: string
): Promise<LMSEnrollment> {
  const enrollment = await frappeClient.call(
    'lms.lms.doctype.lms_enrollment.lms_enrollment.create_enrollment',
    {
      course: courseName,
      member: userEmail,
    },
    userToken
  );

  return enrollment.message;
}

/**
 * Get user's enrollments
 */
export async function getUserEnrollments(
  userEmail: string,
  userToken?: string
): Promise<LMSEnrollment[]> {
  const response = await frappeClient.getDocList(
    'LMS Enrollment',
    ['name', 'course', 'progress', 'enrollment_date'],
    [['member', '=', userEmail]],
    userToken
  );

  return response.data || [];
}

/**
 * Check if user is enrolled in a course
 */
export async function isEnrolled(
  courseName: string,
  userEmail: string,
  userToken?: string
): Promise<boolean> {
  const enrollments = await getUserEnrollments(userEmail, userToken);
  return enrollments.some(e => e.course === courseName);
}

/**
 * Get course progress for user
 */
export async function getCourseProgress(
  courseName: string,
  userEmail: string,
  userToken?: string
): Promise<number> {
  const enrollments = await getUserEnrollments(userEmail, userToken);
  const enrollment = enrollments.find(e => e.course === courseName);
  return enrollment?.progress || 0;
}
