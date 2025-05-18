import express from 'express';
import { getUserProgress, updateCourseProgress, deleteCourse } from '../controllers/userProgress.controller.js';
import verifyUser from '../verifyUser.js';

const router = express.Router();

router.get('/progress', verifyUser, getUserProgress);
router.post('/progress/update', verifyUser, updateCourseProgress);
router.delete('/progress/course/:courseId', verifyUser, deleteCourse);

export default router; 