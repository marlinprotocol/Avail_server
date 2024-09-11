import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
  RPC: z.string().url(),
  PRIVATE_KEY: z.string(),
  PORT: z.number(),
  API_KEY: z.string(),
  SERVER_MODE: z.enum(['DEV', 'PROD']),
  PROOF_REWARD: z.number(),
  MARKET_ID: z.number(),
  MATCHING_ENGINE_URL: z.string().url(),
  CHECK_INPUT_URL: z.string().url(),
  REDIS_HOST: z.string().url(),
  REDIS_PORT: z.number(),
  REDIS_PASSWORD: z.string(),
  RATE_LIMIT_WINDOW: z.number().default(10),
  MAX_REQUESTS: z.number().default(10),
  THROTTLE_DELAY: z.number().default(10),
  ASSIGNMENT_DELAY: z.number().default(10000000000),
  PROOF_GENERATION_DELAY: z.number().default(10000000000),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  const missingEnvVars = Object.keys(parsedEnv.error.format())
    .map((key) => key)
    .join(', ')

  console.error(`Missing or invalid environment variables: ${missingEnvVars}`)
  throw new Error(`Missing or invalid environment variables: ${missingEnvVars}`)
}

const config = parsedEnv.data

export default config
