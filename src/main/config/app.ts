import express from 'express';

import setupSwagger from '@/main/config/config-swagger';
import setupMiddlewares from '@/main/config/middlewares';
import setupStaticFiles from '@/main/config/static-files';
import setupRoutes from '@/main/config/routes';

const app = express();

setupStaticFiles(app);
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);

export default app;
