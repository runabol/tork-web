import { z } from 'zod';

type EnvConfig = {
  backendUrl: string;
  environment: 'development' | 'production';
  port: number;
  baseUrl: string;
};

const envConfigSchema = z.object({
  BACKEND_URL: z.string().min(1),
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number(),
  BASE_URL: z.string().min(1),
});

let ENV_CONFIG: EnvConfig;

try {
  const validationResult = envConfigSchema.safeParse(process.env);
  if (!validationResult.success) {
    console.error('❌ Invalid env:');
    console.error(
      JSON.stringify(validationResult.error.flatten().fieldErrors, null, 2)
    );
    process.exit(1);
  }
  ENV_CONFIG = {
    backendUrl: validationResult.data.BACKEND_URL,
    environment: validationResult.data.NODE_ENV,
    port: validationResult.data.PORT,
    baseUrl: validationResult.data.BASE_URL,
  };
} catch (error: any) {
  console.error('❌ Error parsing environment variables:', error);
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default ENV_CONFIG;
