import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import  connectDB from "./utils/configdb";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import adminRoutes from "./routes/admin";
import { limiter } from "./middleware/rateLimiter";
import helmet from "helmet";
import { swaggerSpec } from "./utils/swagger";
import swaggerUi from 'swagger-ui-express';
dotenv.config();
connectDB();

const app = express();
app.use(limiter);

app.use(cors());
app.use(express.json());
app.use(helmet());

// documentation setup
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// ✅ Organized route mounting
app.use("/api/auth", authRoutes);   // Authentication routes
app.use("/api/todos", todoRoutes);  // Todo routes
app.use("/api/admin", adminRoutes); // Admin routes


app.get("/", (_req, res) => {
  res.send("🚀 TypeScript + ts-node-dev is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
  console.log(`Server is running on http://localhost:${PORT}`));
