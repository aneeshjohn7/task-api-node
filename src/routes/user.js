import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { validateIdParam } from '../middleware/validateIdParam.js';

const router = Router();

// Create user
router.post('/', validateIdParam, asyncWrapper(createUser));

// Get all users
router.get('/', validateIdParam, asyncWrapper(getUsers));

// Get user by ID
router.get('/:id', validateIdParam, asyncWrapper(getUserById));

router.put('/:id', validateIdParam, asyncWrapper(updateUser));

router.delete('/:id', validateIdParam, asyncWrapper(deleteUser));

export default router;