import "dotenv/config";

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET", "JWT_EXPIRY"] as const;

type EnvVarName = (typeof requiredEnvVars)[number];
// Çevresel değişkenleri kontrol eder eğer istenenler çevresel değişkenlerden en az bir tanesi bulunmuyorsa hata verir. Değişkenler doğru mu diye kontrol etmez.
function validateEnv(): void {
  const missingVars: EnvVarName[] = [];

  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `❌ Eksik çevresel değişkenler: ${missingVars.join(", ")}\n` +
        `Lütfen .env dosyanızı kontrol edin.`,
    );
  }

  console.log("✅ Tüm çevresel değişkenler yüklendi.");
}

// Get a required environment variable (throws if not found)
export function getEnv(name: EnvVarName): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Çevresel değişken bulunamadı: ${name}`);
  }
  return value;
}

// Validate on import
validateEnv();

export { requiredEnvVars };
