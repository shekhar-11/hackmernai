import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctOption: Number
});

const lessonSchema = new mongoose.Schema({
  id: String,
  title: String,
  content: String,
  duration: String,
  completed: {
    type: Boolean,
    default: false
  },
  quiz: quizSchema,
  quizCompleted: {
    type: Boolean,
    default: false
  }
});

const courseProgressSchema = new mongoose.Schema({
  courseId: String,
  title: String,
  organization: String,
  progress: {
    type: Number,
    default: 0
  },
  lessonsCompleted: {
    type: Number,
    default: 0
  },
  totalLessons: Number,
  quizScore: {
    type: Number,
    default: 0
  },
  lessons: [lessonSchema]
});

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courses: [courseProgressSchema]
}, { timestamps: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);
export default UserProgress; 