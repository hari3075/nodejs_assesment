import express from 'express';
import Course from '../models/coursemodel.js';
import User from '../models/usermodel.js';
import authenticate from '../middleware/authMiddilewares.js';
import { isPointWithinRadius } from 'geolib';  
const router = express.Router();


router.post('/course', authenticate, async (req, res) => {
  const { class: courseClass, subject, board, latitude, longitude } = req.body;

  try {
    const course = new Course({
      class: courseClass,
      subject,
      board,
      latitude,
      longitude,
      createdBy: req.user._id
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/courses', authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      console.log('User Location:', user.latitude, user.longitude);  // Debugging log
  
      const courses = await Course.find();
      console.log('Courses data:', courses); 
  
      const filteredCourses = courses.filter(course => {
        console.log('Course location:', course.latitude, course.longitude);  // Debugging log
  
        if (!user.latitude || !user.longitude || !course.latitude || !course.longitude) {
          return false;  
        }
  
        const distance = isPointWithinRadius(
          { latitude: course.latitude, longitude: course.longitude },
          { latitude: user.latitude, longitude: user.longitude },
          16093 
        );
  
        console.log(`Distance to course (${course.latitude}, ${course.longitude}): ${distance ? 'Within 10 miles' : 'Outside 10 miles'}`);
  
        return distance;
      });
  
      res.json(filteredCourses);  
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
export default router;

