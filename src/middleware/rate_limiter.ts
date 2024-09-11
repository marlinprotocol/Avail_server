import config from '../config'
import Redis from 'ioredis'

const redisClient = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD,
})

console.log('Redis running on port: ', config.REDIS_PORT)

// Fetching parameters for Rate Limiting
const rateLimitWindowSeconds = config.RATE_LIMIT_WINDOW
const maxRequestsPerWindow = config.MAX_REQUESTS
const throttleDelaySeconds = config.THROTTLE_DELAY

// Rate Limiting and Throttling
export const checkRateLimitAndThrottle = async (signer: string) => {
  const currentTime = Date.now()
  const rateLimitKey = `rateLimit:${signer}`
  const lastRequestKey = `lastRequest:${signer}`

  // Request Throttling: Check if the last request was made within the throttle delay
  const lastRequestTime = await redisClient.get(lastRequestKey)
  if (
    lastRequestTime &&
    currentTime - parseInt(lastRequestTime) < throttleDelaySeconds * 1000
  ) {
    throw new Error(
      'You are sending requests too quickly. Please wait for few seconds and try again.'
    )
  }

  // Rate Limiting: Check the request count within the time window
  const rateLimitData = await redisClient.hgetall(rateLimitKey)
  let requestCount = parseInt(rateLimitData.count || '0')

  if (requestCount >= maxRequestsPerWindow) {
    throw new Error(
      'You have exceeded the number of allowed requests per hour. Please try again later.'
    )
  }

  // Increment the request count since this request is valid
  await redisClient.hmset(rateLimitKey, {
    count: requestCount + 1,
  })

  // Set the expiration time (TTL) only if the key is new
  if (requestCount === 0) {
    await redisClient.expire(rateLimitKey, rateLimitWindowSeconds)
  }

  // Update the last request time after all checks pass
  await redisClient.set(lastRequestKey, currentTime.toString())
}
