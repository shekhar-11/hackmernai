import UserProgress from '../model/userProgress.model.js';
import { errorHandler } from '../error/error.js';

// Get user's course progress
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const userProgress = await UserProgress.findOne({ userId });
    
    if (!userProgress) {
      return res.status(200).json({ courses: [] });
    }
    
    res.status(200).json({ courses: userProgress.courses });
  } catch (error) {
    errorHandler(error, res);
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      return res.status(404).json({ message: 'User progress not found' });
    }

    // Remove the course from the courses array
    userProgress.courses = userProgress.courses.filter(
      course => course.courseId !== courseId
    );

    await userProgress.save();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    errorHandler(error, res);
  }
};

// Update course progress
export const updateCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, courseData } = req.body;

    let userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      userProgress = new UserProgress({
        userId,
        courses: []
      });
    }

    // Find the course index in the user's courses array
    const courseIndex = userProgress.courses.findIndex(
      course => course.courseId === courseId
    );

    // If course doesn't exist, add it with complete data
    if (courseIndex === -1) {
      userProgress.courses.push({
        courseId,
        title: courseData.title,
        organization: courseData.organization,
        progress: courseData.progress,
        lessonsCompleted: courseData.lessonsCompleted,
        totalLessons: courseData.totalLessons,
        quizScore: courseData.quizScore,
        lessons: courseData.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          content: lesson.content,
          duration: lesson.duration,
          completed: lesson.completed,
          quiz: {
            question: lesson.quiz.question,
            options: lesson.quiz.options,
            correctOption: lesson.quiz.correctOption
          }
        }))
      });
    } else {
      // Update existing course with complete data
      userProgress.courses[courseIndex] = {
        courseId,
        title: courseData.title,
        organization: courseData.organization,
        progress: courseData.progress,
        lessonsCompleted: courseData.lessonsCompleted,
        totalLessons: courseData.totalLessons,
        quizScore: courseData.quizScore,
        lessons: courseData.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.title,
          content: lesson.content,
          duration: lesson.duration,
          completed: lesson.completed,
          quiz: {
            question: lesson.quiz.question,
            options: lesson.quiz.options,
            correctOption: lesson.quiz.correctOption
          }
        }))
      };
    }

    await userProgress.save();
    res.status(200).json({ message: 'Progress updated successfully' });
  } catch (error) {
    errorHandler(error, res);
  }
}; 