'use server';

import { z } from 'zod';

import { Environment, environmentEnumSchema } from '@/models';

// Pass dynamic variables and client side ENV variables through here.
// DO NOT pass secrets through here as it will be accessible client-side.
export type ClientEnvConfig = {
  backendUrl: string;
  baseUrl: string;
  environment: Environment;
};

export type EnvConfig = {
  someSecret?: string;
} & ClientEnvConfig;

const envConfigSchema = z.object({
  //  server-side
  SOME_SECRET: z.string().optional(),
  BACKEND_URL: z.string().min(1),
  BASE_URL: z.string().min(1),
  NODE_ENV: environmentEnumSchema.optional().default('development'),

  // static client-side
  // NEXT_PUBLIC_<NAME>: z.string().min(1),
});

let ENV_CONFIG: EnvConfig;

function initEnvConfig(): EnvConfig {
  const validationResult = envConfigSchema.safeParse(process.env);

  if (!validationResult.success) {
    console.error('❌ Invalid environment configuration:');
    console.error(
      JSON.stringify(validationResult.error.flatten().fieldErrors, null, 2)
    );
    // Return an empty object if validation fails
    return {} as EnvConfig;
  }

  const { SOME_SECRET, BACKEND_URL, BASE_URL, NODE_ENV } =
    validationResult.data;

  return {
    someSecret: SOME_SECRET,
    backendUrl: BACKEND_URL,
    baseUrl: BASE_URL,
    environment: NODE_ENV,
  };
}

export async function getEnvConfig(): Promise<EnvConfig> {
  if (!ENV_CONFIG) {
    ENV_CONFIG = initEnvConfig();
  }
  return ENV_CONFIG;
}

export async function getClientEnvConfig(): Promise<ClientEnvConfig> {
  const config = await getEnvConfig();
  // Only pass variables here that you want to expose to the client-side.
  // Do not pass secrets or sensitive data.
  return {
    backendUrl: config.backendUrl,
    baseUrl: config.baseUrl,
    environment: config.environment,
  };
}
