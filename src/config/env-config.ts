import { z } from 'zod';

type EnvConfig = {
  backendUrl: string;
  baseUrl: string;
  environment: 'development' | 'production';
  port: number;
};

const envConfigSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().min(1),
  NEXT_PUBLIC_BASE_URL: z.string().min(1),
  NODE_ENV: z
    .enum(['development', 'production'])
    .optional()
    .default('development'),
  PORT: z.coerce.number().optional().default(3000),
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
    backendUrl: validationResult.data.NEXT_PUBLIC_BACKEND_URL,
    baseUrl: validationResult.data.NEXT_PUBLIC_BASE_URL,
    environment: validationResult.data.NODE_ENV,
    port: validationResult.data.PORT,
  };
} catch (error: any) {
  console.error('❌ Error parsing environment variables:', error);
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default ENV_CONFIG;
