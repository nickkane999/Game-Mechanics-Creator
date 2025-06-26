import { Router, Request, Response } from 'express';
import { GameMechanicType, SchemaGenerationRequest, ApiResponse } from '../types/index';
import { MechanicsService } from '../services/MechanicsService';

const router = Router();
const mechanicsService = new MechanicsService();

router.get('/types', async (req: Request, res: Response) => {
  try {
    const types = mechanicsService.getAvailableTypes();
    const response: ApiResponse = {
      success: true,
      data: types,
      message: 'Available game mechanic types retrieved successfully'
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

router.get('/battle-pass/template', async (req: Request, res: Response) => {
  try {
    const template = mechanicsService.getBattlePassTemplate();
    const response: ApiResponse = {
      success: true,
      data: template,
      message: 'Battle pass template retrieved successfully'
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

router.post('/generate-schema', async (req: Request, res: Response) => {
  try {
    const request: SchemaGenerationRequest = req.body;
    const result = await mechanicsService.generateSchema(request);
    
    const response: ApiResponse = {
      success: true,
      data: result,
      message: 'Schema generated successfully'
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

export { router as mechanicsRoutes }; 