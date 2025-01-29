import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    class: String,
    subject: String,
    board: String,
    latitude: Number,  
    longitude: Number,  
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
  const Course = mongoose.model('Course', CourseSchema);
  export default Course;