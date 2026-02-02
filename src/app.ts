import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import "./infrastructure/config/env.js"; // Env validasyonu
import authRoutes from "./presentation/routes/index.js";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './infrastructure/config/swagger.js';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// --- Middleware'ler ---
app.use(cors());
app.use(express.json());

// --- Swagger Dökümantasyonu ---
// !!!!!!!!!!!!!!!!!!!!! Rotalardan önce ekliyoruz ki /api-docs her zaman erişilebilir olsun !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Rotalar ---
app.use("/auth", authRoutes);

// Basit bir test rotası
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "SocialPhoto Backend çalışıyor!",
    swagger: `http://localhost:${PORT}/api-docs`,
    status: "OK",
    timestamp: new Date(),
  });
});

// --- Sunucuyu Başlat ---
app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde aktif.`);
  console.log(`📝 Swagger dökümanı: http://localhost:${PORT}/api-docs`);
});