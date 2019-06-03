import express from 'express';
import userRouter from './users/v1/routes';

const router = express.Router();

// api router will mount other routers for all our resources
router.use('/users/v1', userRouter);

export default router;