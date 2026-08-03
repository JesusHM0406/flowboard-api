import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required.'),
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'JWT_ACCESS_SECRET must contain 32 characters at least.'),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'JWT_REFRESH_SECRET must contain 32 characters at least.'),
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z
    .enum(['production', 'development', 'test'])
    .default('development'),
});

type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): EnvConfig {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    console.error('Environment variable validation failed');
    console.error(JSON.stringify(result.error.format(), null, 2));
    throw new Error('Invalid environment variable configuration');
  }

  return result.data;
}
