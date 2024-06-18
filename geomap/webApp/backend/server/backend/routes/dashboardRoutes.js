// import express from 'express';
// import { getDashboardLinks, addDashboardLinks } from '../controllers/tableauLink.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/dashboardLinks', protect, getDashboardLinks);
// router.post('/addDashboardLinks', protect, addDashboardLinks);

// export default router;
// import express from 'express';
// import { getDashboardLinks, addDashboardLinks } from '../controllers/tableauLink.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/dashboardLinks', protect, getDashboardLinks);
// router.post('/addDashboardLinks', protect, addDashboardLinks);

// export default router;

import express from 'express';
const router = express.Router();
import { getDashboardLinks, addDashboardLinks } from '../controllers/tableauLink.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/links').get(protect, getDashboardLinks);
router.route('/add').post(protect, addDashboardLinks);

export default router;

