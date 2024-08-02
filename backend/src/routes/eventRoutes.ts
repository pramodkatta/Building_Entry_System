import { Router } from 'express';
import { registerEntry, registerExit, getPeopleInside, getHistory, getAnalytics } from '../controllers/eventController';

const router = Router();

router.post('/entry', registerEntry);
router.post('/exit', registerExit);
router.get('/people', getPeopleInside);
router.get('/history', getHistory);
router.get('/analytics', getAnalytics);

export default router;
