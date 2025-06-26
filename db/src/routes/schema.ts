import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types/index';

const router = Router();

router.get('/validate', async (req: Request, res: Response) => {
  try {
    const response: ApiResponse = {
      success: true,
      message: 'Schema validation endpoint ready'
    };
    res.json(response);
  } catch (error) {
    const response: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(response);
  }
});

export { router as schemaRoutes }; 