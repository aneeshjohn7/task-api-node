import { Router } from 'express';
import { getHealth, getHealthById } from '../controllers/health.controller.js';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { validateIdParam } from '../middleware/validateIdParam.js';

const router = Router();

router.get('/', asyncWrapper(getHealth));

router.get(
  '/:id',
  validateIdParam, // 👈 runs first
  asyncWrapper(getHealthById), // 👈 runs after validation
);

export default router;


