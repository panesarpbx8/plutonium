import { Router } from 'express';

const router = Router();

router.get('/api/**', (request, response) => {
  response.json({
    message: 'Feature not implemented yet!',
  });
});

export { router };

