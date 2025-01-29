import express from 'express';
import dotenv from 'dotenv';
import dataBaseconnection from './src/database/db.js'; 
import userRoutes from './src/routes/userroutes.js';  
import authRoutes from './src/routes/authRoutes.js';
import coursesRoutes from './src/routes/courseRoutes.js'  

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);  
app.use('/api/auth', authRoutes); 
app.use('/api',coursesRoutes);
dataBaseconnection.then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Your app is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("❌ Database connection failed. Server not started.", error);
});
