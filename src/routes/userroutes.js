import express from 'express';
import User from '../models/usermodel.js';
import authenticate  from '../middleware/authMiddilewares.js';
import upload from '../middleware/uploadMiddileware.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/', authenticate, upload.single('profileImage'), async (req, res) => {
    try {
        const updates = req.body;
        if (req.file) updates.profileImage = req.file.path;

        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.delete('/', authenticate, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
