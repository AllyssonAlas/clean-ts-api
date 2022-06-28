import express from 'express';

import setupSwagger from '@/main/config/swagger';
import setupApolloServer from '@/main/config/apollo-server';
import setupMiddlewares from '@/main/config/middlewares';
import setupStaticFiles from '@/main/config/static-files';
import setupRoutes from '@/main/config/routes';

const app = express();

setupStaticFiles(app);
setupApolloServer(app);
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);

export default app;
