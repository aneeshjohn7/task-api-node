import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from '../controllers/user.controller.js';
import { asyncWrapper } from '../middleware/asyncWrapper.js';
import { validateIdParam } from '../middleware/validateIdParam.js';
import { paginationMiddleware } from "../middleware/pagination.js";
import { apiLimiter } from "../middleware/requestLimiter.js";
import { authCheck } from "../middleware/authCheck.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

// Create user
router.post('/register', asyncWrapper(createUser));

router.post('/login', asyncWrapper(loginUser));

// Get all users
router.get('/', paginationMiddleware, apiLimiter, asyncWrapper(getUsers));

// Get user by ID
router.get('/:id', validateIdParam, authCheck, authorize('admin'), asyncWrapper(getUserById));

router.put('/:id', validateIdParam, asyncWrapper(updateUser));

router.delete('/:id', validateIdParam, asyncWrapper(deleteUser));


export default router;