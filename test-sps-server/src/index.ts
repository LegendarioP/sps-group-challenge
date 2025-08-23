import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import { envConfig } from './infrastructure/config/env.config';
import userRoutes from './presentation/routes/user.routes';
import authRoutes from './presentation/routes/auth.routes';

const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 
    message: 'SPS Group Challenge API', 
    version: '1.0.0',
    timestamp: new Date().toISOString() 
  });
});

apiRouter.use("/users", userRoutes);
apiRouter.use("/auth", authRoutes);

app.use(apiRouter);

app.listen(envConfig.app.port, () => {
  console.log(`Server is running on http://localhost:${envConfig.app.port}`);
});
