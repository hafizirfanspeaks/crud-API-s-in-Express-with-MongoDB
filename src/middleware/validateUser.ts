import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodSchema) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation Failed",
          errors: error.issues.map((e) => {
            const path = e.path.length > 1 ? e.path[1] : e.path[0];
            
            // We cast 'e' to 'any' briefly to access expected/received 
            // without needing the broken ZodInvalidTypeIssue import
            if (e.code === "invalid_type") {
              const issue = e as any; 
              return {
                field: path,
                message: `Expected ${issue.expected}, but received ${issue.received}`
              };
            }

            return {
              field: path,
              message: e.message
            };
          })
        });
      }
      return res.status(500).json({ 
        success: false, 
        message: "An unexpected internal server error occurred" 
      });
    }
  };