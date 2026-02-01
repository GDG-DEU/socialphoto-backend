import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";

// Çevresel değişkenleri yükle (.env dosyası için)
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware'ler
app.use(cors()); // Her yerden gelen isteklere izin ver (Dev ortamı için)
app.use(express.json()); // JSON verilerini okuyabilmek için

// Basit bir test rotası
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Backend çalışıyor!",
    status: "OK",
    timestamp: new Date(),
  });
});

// Sunucuyu ayağa kaldır
app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});
