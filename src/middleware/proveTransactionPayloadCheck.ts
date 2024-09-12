import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const proveTxSchema = z.object({
  public: z.any(), //TODO defgine the shape of the public here
  secret: z.any(), // TODO define the shape of secret here
});

export const validateProveTxPayload = (req: Request, res: Response, next: NextFunction) => {
  const parseResult = proveTxSchema.safeParse(req.body);

  if (!parseResult.success) {
    const errors = parseResult.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
    return res.status(400).json({
      message: 'Invalid request .',
      errors: errors,
    });
  }

  const signer = req.body?.secret?.auth?.requests?.[0]?.signer;
  if (!signer) {
    return res.status(400).send('Signer is required.');
  }

  req.signer = signer;

  next();
};

declare global {
  namespace Express {
    interface Request {
      signer?: string;
    }
  }
}
