import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    
  },
  subtitle: {
    type: String,
    required: true,
    
  },
  content: {
    type: String,   
  },
  quizScore:{
    type: Number,
    default: 0,
  }
},{timestamps: true});
const Course = mongoose.model('Course', courseSchema);
export default Course;