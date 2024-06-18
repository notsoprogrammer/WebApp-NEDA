import express from 'express';
import { getDashboardLinks, addDashboardLinks } from '../controllers/tableauLink.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboardLinks', protect, getDashboardLinks);
router.post('/addDashboardLinks', protect, addDashboardLinks);

export default router;
